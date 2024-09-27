import { CategoryService } from './../../../services/category.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AttributeOptionService } from '../../../services/attribute-option.service';
import { AttributeService } from '../../../services/attribute.service';
import { ProductService } from '../../../services/product.service';
import { AttributeOption } from '../../../interfaces/attribute-option';
import { CommonService } from '../../../services/common.service';

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
    private commonService:CommonService
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
      if (attributeId) {
        const index = this.attributeArray.length - 1;
        this.loadAttributeOptions(attributeId, index);
      }
    });
  
    this.attributeArray.push(attributeGroup);
  }
  
  onImageSelect(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
        this.selectedImage = fileInput.files[0]; // Gán giá trị cho selectedImage
        const reader = new FileReader();
        reader.onload = (e) => {
            this.imagePreview = e.target?.result;
        };
        reader.readAsDataURL(this.selectedImage);
    }
}


onAlbumSelect(event: Event): void {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files) {
      this.selectedAlbum = Array.from(fileInput.files); // Gán giá trị cho selectedAlbum
      this.albumPreviews = [];
      this.selectedAlbum.forEach(file => {
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
        console.error(error);
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
      console.log(this.productForm.value);
      
      await this.productService.saveProduct(formData).toPromise();
      this.commonService.showAutoCloseAlert("success","Success","Add product successfully");
      this.productForm.reset();
    } catch (error) {
      this.commonService.showAutoCloseAlert("error","Error","Add product failed");
    }
  }
  
}