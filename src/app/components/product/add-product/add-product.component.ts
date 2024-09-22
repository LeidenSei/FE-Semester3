import { CategoryService } from './../../../services/category.service';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AttributeOptionService } from '../../../services/attribute-option.service';
import { AttributeService } from '../../../services/attribute.service';
import { ProductService } from '../../../services/product.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  public Editor: any;
  productForm: FormGroup;
  categories: any[] = [];
  attributes: any[] = [];
  attributeOptions: any[][] = [];
  selectedImage: File | null = null;
  selectedAlbum: File[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private attributeService: AttributeService,
    private categoryService: CategoryService,
    private attributeOptionService: AttributeOptionService,
    @Inject(PLATFORM_ID) private platformId: Object
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

  get attributeArray(): FormArray {
    return this.productForm.get('Attributes') as FormArray;
  }

  addAttribute() {
    const attributeGroup = this.fb.group({
      AttributeId: ['', Validators.required],
      OptionId: ['', Validators.required],
    });
    this.attributeArray.push(attributeGroup);
  }

  removeAttribute(index: number) {
    this.attributeArray.removeAt(index);
  }

  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onAlbumSelect(event: any) {
    this.selectedAlbum = Array.from(event.target.files);
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

  loadAttributeOptions(attributeId: number, index: number) {
    this.attributeOptionService.searchAttributeOptions({ AttributeId: attributeId }).subscribe(options => {
      this.attributeOptions[index] = options.data;
    });
  }

  onSubmit() {
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
  
    this.productService.saveProduct(formData).subscribe(response => {
      console.log('Product added successfully', response);
    }, error => {
      console.error('Error adding product', error);
    });
  }
  
}