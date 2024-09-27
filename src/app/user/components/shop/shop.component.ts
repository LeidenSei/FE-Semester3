import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
import { SearchParams } from '../../../services/search-params';
import { Category } from '../../../interfaces/category';
import { CategoryService } from '../../../services/category.service';
import { log } from 'console';
import { AuthUserService } from '../../../services/auth.user.service';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  product: any;
  categories: any; 
  totalRecords = 0;
  pageSize = 10;
  currentPage = 1;
  searchKeyword = '';
  statusFilter = '';
  sortBy = '';
  sortDir = '';
  categoryId = '';
  sliderValue = '';
  currentValue: string = 'Initial Value'; // Initial value
  minPrice: number = 0;
  maxPrice: number = 100000;
  fromPrice = 0;
  toPrice = 0;
  isModalShow: boolean = false;
  albumPreviews: string[] = []; 
  quantity: number = 1; // Default quantity


  Math = Math;
  constructor
  (
    private productService: ProductService, 
     private categoryService: CategoryService,
     private auth: AuthUserService,
     private cartService:CartService,
     private router: Router

  ) {}

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
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      toPrice: this.toPrice,
      fromPrice: this.fromPrice,
      categoryId: this.categoryId,
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
    console.log('Searching...' +this.searchKeyword)
    this.currentPage = 1;
    this.loadProducts();
  }

  onSortChange(event: any) {
    const selectedSort = event.target.value;
    const parts = selectedSort.split('-');
    const sortBy = parts[0];
    const sortDir = parts[1];
    switch (sortDir) {
      case 'asc':
        this.sortBy = 'ProductName';
        this.sortDir = 'asc';
        this.loadProducts();
        break;
      case 'desc':
        this.sortBy = 'ProductName';
        this.sortDir = 'desc';
        this.loadProducts();
        break;
      default:
        this.sortBy='';
        this.sortDir = '';
        this.loadProducts();
        break;
    }
  }

  handleSortByCategory(id:any):void {
    this.categoryId = id+"";
    this.loadProducts();
  }

  // Method to filter items based on the selected price range
  filterItems() {
   this.fromPrice = this.minPrice;
   this.toPrice = this.maxPrice;
   this.loadProducts();
  }
  
  loadProduct(id:any) {
    this.productService.getProductById(id).subscribe(response => {
      const modifiedObject = { ...response, imageUrl: `http://localhost:7038/images/${response.image}` };
      this.product = modifiedObject;
      if (typeof this.product.album === 'string' && this.product.album !='') {
        try {
          this.product.album = JSON.parse(this.product.album);
        } catch (error) {
          console.error('Error parsing album:', error);
          this.product.album = [];
        }
      }

      if (Array.isArray(this.product.album)) {
        this.albumPreviews = this.product.album.map((image:string) => 'http://localhost:7038/images/' + image);
      } else {
        this.albumPreviews = [];
      }
    }, error => {
      console.error('Error loading products', error);
    });
  }

  increment(): void {
    this.quantity++;
  }

  decrement(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onQuantityChange(value: number): void {
    if (value < 1) {
      this.quantity = 1;
    } else {
      this.quantity = value;
    }
  }

  addToCart(productId1:string) {
    //check xem login chưa
   if(!this.auth.isLoggedIn()){
    alert('You are not loging!!')
    //this.router.navigate(['/sign-in'])
    return;
   }
   const request = {
    userId: this.auth.getUserIdFromToken(),
    productId: productId1+"",
    quantity: this.quantity+"",
    price: this.product.salePrice!=0?this.product.salePrice + "":this.product.price + ""
   }

    // tạo request 
    this.cartService.addToCart(request).subscribe(response => {
      alert('Added successfully');
    }, 
    (error:any) => {
      console.error('Error add product', error);  
    });
  }
}