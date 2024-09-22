import { CategoryService } from './../../../services/category.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AttributeOptionService } from '../../../services/attribute-option.service';
import { AttributeService } from '../../../services/attribute.service';
import { ProductService } from '../../../services/product.service';
import { AttributeOption } from '../../../interfaces/attribute-option';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  public Editor: any;
  public isBrowser: boolean | undefined;
  productForm: FormGroup;
  categories: any[] = [];
  attributes: any[] = [];
  attributeOptions: any[][] = [];
  selectedImage: File | null = null;
  selectedAlbum: File[] = [];
  imagePreview: any;
  albumPreviews: string[] = [];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private attributeService: AttributeService,
    private categoryService: CategoryService,
    private attributeOptionService: AttributeOptionService,
  ) {
    this.productForm = this.fb.group({
      ProductName: ['', Validators.required],
      Price: ['', Validators.required],
      SalePrice: [''],
      CategoryId: ['', Validators.required],
      Description: [''],
      Image: [null],
      Album: [null],
      Active: ['1', Validators.required],
      Attributes: this.fb.array([])
    });

  }

  ngOnInit(): void {
    
    this.loadCategories();
    this.loadAttributes();
  }
  ngAfterViewInit(): void {
    const descriptionElement = document.getElementById('description');
    if (descriptionElement && typeof (window as any)['CKEDITOR'] !== 'undefined') {
      const editor = (window as any)['CKEDITOR'].replace(descriptionElement);
      editor.on('change', () => {
        const data = editor.getData();
        this.productForm.controls['Description'].setValue(data);
      });
    } else {
      console.error('CKEditor chưa được tải đúng cách hoặc không tìm thấy phần tử.');
    }
  }
  get attributeArray(): FormArray {
    return this.productForm.get('Attributes') as FormArray;
  }

  addAttribute() {
    const attributeGroup = this.fb.group({
      AttributeId: ['', Validators.required],
      OptionId: ['', Validators.required],
    });
  
    attributeGroup.get('AttributeId')?.valueChanges.subscribe(attributeId => {
      if (attributeId) { // Kiểm tra nếu attributeId không phải là null
        const index = this.attributeArray.length - 1;
        this.loadAttributeOptions(attributeId, index);
      }
    });
  
    this.attributeArray.push(attributeGroup);
  }
  
  onImageSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onAlbumSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      this.albumPreviews = [];
      Array.from(fileInput.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.albumPreviews.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeAttribute(index: number) {
    this.attributeArray.removeAt(index);
  }

  loadCategories() {
    this.categoryService.searchCategories({ PageNumber: 1, PageSize: 100 }).subscribe(response => {
      this.categories = response.data;
      
    }, error => {
      console.error('Error loading categories', error);
    });
  }

  loadAttributes() {
    this.attributeService.searchAttributes({}).subscribe(attributes => {
      this.attributes = attributes.data;
      
      this.attributes.forEach((attr, index) => {
        this.loadAttributeOptions(attr.id, index);
      });
    });
  }

  loadAttributeOptions(attributeId: string, index: number) {
    this.attributeOptionService.getAttributeOptionByAttributeId(attributeId).subscribe(
      (options: AttributeOption[]) => { 
        this.attributeOptions[index] = options;
      },
      error => {
        console.error('Có lỗi xảy ra khi tải tùy chọn thuộc tính:', error);
      }
    );
  }
  

  async onSubmit() {
    const formData = new FormData();
  
    formData.append('ProductName', this.productForm.get('ProductName')?.value);
    formData.append('Price', this.productForm.get('Price')?.value);
    formData.append('SalePrice', this.productForm.get('SalePrice')?.value);
    formData.append('CategoryId', this.productForm.get('CategoryId')?.value);
    formData.append('Description', this.productForm.get('Description')?.value);
    formData.append('Active', this.productForm.get('Active')?.value);
    
    if (this.selectedImage) {
      formData.append('Image', this.selectedImage);
    }
  
    this.selectedAlbum.forEach(file => {
      formData.append('Album', file);
    });
  
    const attributes = this.productForm.get('Attributes')?.value;
    formData.append('Attributes', JSON.stringify(attributes));
  
    try {
      const response = await this.productService.saveProduct(formData).toPromise();
      alert('Product added successfully');
    } catch (error) {
      console.error('Error adding product', error);
    }
  }
  
  
}