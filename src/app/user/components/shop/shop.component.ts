import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
import { SearchParams } from '../../../services/search-params';
import { Category } from '../../../interfaces/category';
import { CategoryService } from '../../../services/category.service';
import { log } from 'console';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  categories: any; 
  totalRecords = 0;
  pageSize = 10;
  currentPage = 1;
  searchKeyword = '';
  statusFilter = '';

  Math = Math;

  constructor(private productService: ProductService,  private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    const searchParams: SearchParams = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
      keyword: this.searchKeyword,
      status: this.statusFilter,
      sortBy: '',
      sortDir: '',
      toPrice: 0,
      fromPrice: 0,
      categoryId: '',
      optionIds: []
    };
  
    this.productService.searchProducts(searchParams).subscribe(response => {
      this.products = response.data.map((product: Product) => {
        return {
          ...product,
          imageUrl: `https://localhost:7038/images/${product.image}`
        };
      });
      this.totalRecords = response.totalRecords;
    }, error => {
      console.error('Error loading products', error);
    });
  }

loadCategories() {
  console.log('Loading categories...'); // Thêm log này
  this.categoryService.getAllCategories().subscribe(response => {      
    this.categories = response;
    console.log(this.categories);
  }, error => {
    console.error('Error loading categories', error);
  });
}

  onPageChange(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.totalRecords / this.pageSize)) {
      this.currentPage = page;
      this.loadProducts();
    }
  }

  onSearch() {
    this.currentPage = 1;
    this.loadProducts();
  }

}