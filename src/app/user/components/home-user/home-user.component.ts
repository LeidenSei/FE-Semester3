import { Component } from '@angular/core';
import { HomeDataComponent } from '../home-data/home-data.component';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
import { SearchParams } from '../../../services/search-params';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent {
  products: Product[] = [];
  totalRecords = 0;
  pageSize = 10;
  currentPage = 1;
  searchKeyword = '';
  statusFilter = '';

  Math = Math

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
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
  
    // this.productService.getList(searchParams).subscribe(response => {
    //   this.products = response.data.map((product: Product) => {
    //     return {
    //       ...product,
    //       imageUrl: `https://localhost:7038/images/${product.image}`
    //     };
    //   });
    //   this.totalRecords = response.totalRecords;
    // }, error => {
    //   console.error('Error loading products', error);
    // });
  }
  
}
