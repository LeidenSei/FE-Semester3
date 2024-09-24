import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { SearchParams } from '../../../services/search-params';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-home-data',
  templateUrl: './home-data.component.html',
  styleUrl: './home-data.component.css'
})
export class HomeDataComponent {
  products: Product[] = [];
  totalRecords = 0;
  pageSize = 5;
  currentPage = 1;
  searchKeyword = '';
  statusFilter = '';

  constructor(private productService: ProductService) {}

  // ngOnInit() {
  //   this.loadProducts();
  // }

  // loadProducts() {
  //   const searchParams = {
  //     pageNumber: this.currentPage,
  //     pageSize: this.pageSize,
  //     keyword: this.searchKeyword,
  //     status: this.statusFilter
  //   };
  //   this.productService.getList(searchParams).subscribe(response => {
  //     console.log(response)
  //     this.products = response.data;
  //   //  this.totalRecords = response.totalRecords;
  //   }, error => {
  //     console.error('Error loading products', error);
  //   });
  // }
  
}
