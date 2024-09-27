import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productForm: any;
  product: any; 
  categories: any[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  albumPreviews: string[] = []; 
  selectedAlbumFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService:CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private commonService:CommonService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.initForm();
    this.loadProduct(productId);
    this.loadCategories();
  }

  initForm() {
    this.productForm = this.fb.group({
      ProductName: [''],
      Price: [''],
      SalePrice: [''],
      CategoryId: [''],
      Description: [''],
      Active: [''],
    });
  }

  loadProduct(id: string | null) {
    if (id) {
      this.productService.getProductById(id).subscribe((product) => {
        this.product = product;
        
        this.productForm.patchValue({
          ProductName: product.productName,
          Price: product.price,
          SalePrice: product.salePrice,
          CategoryId: product.categoryId,
          Description: product.description,
          Active: product.active ? '1' : '0',
        });

        if (typeof product.album === 'string') {
          try {
            product.album = JSON.parse(product.album);
          } catch (error) {
            console.error('Error parsing album:', error);
            product.album = [];
          }
        }
  
        if (Array.isArray(product.album)) {
          this.albumPreviews = product.album.map(image => 'http://localhost:7038/images/' + image);
        } else {
          this.albumPreviews = [];
        }
      });
    }
  }
  
  selectedImage: File | null = null;

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreview = e.target.result;
      reader.readAsDataURL(file);
    }
  }
  
  loadCategories() {
    this.categoryService.searchCategories({ PageNumber: 1, PageSize: 100 }).subscribe(response => {
      this.categories = response.data;
      
    }, error => {
      console.error('Error loading categories', error);
    });
  }

  onAlbumSelect(event: any) {
    const files = event.target.files as FileList;
    this.selectedAlbumFiles = [];
    if (files && files.length) {
        Array.from(files).forEach((file: File) => {
            this.selectedAlbumFiles.push(file);
            const reader = new FileReader();
            reader.onload = (e: any) => this.albumPreviews.push(e.target.result);
            reader.readAsDataURL(file);
        });
    }
}


  onSubmit() {
    if (this.productForm.valid) {
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
  
      if (this.selectedAlbumFiles.length > 0) {
        this.selectedAlbumFiles.forEach((file: File) => {
            formData.append('Album', file);
        });
    }
    
      console.log(formData);
      
      this.productService.saveProduct(formData, this.product.id).subscribe(response => {
        this.commonService.showAutoCloseAlert("success","Success","Update product successfully");
      }, error => {
        console.error('Error saving product', error);
      });
    } else {
      this.commonService.showAutoCloseAlert("error","Error","Update product failed");
    }
  }
  
}