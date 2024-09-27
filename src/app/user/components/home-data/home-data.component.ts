import { Component, OnDestroy, OnInit, Output, Type } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { SearchParams } from '../../../services/search-params';
import { Product } from '../../../interfaces/product';
import { EventEmitter } from 'node:stream';
import { AuthUserService } from '../../../services/auth.user.service';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home-data',
  templateUrl: './home-data.component.html',
  styleUrl: './home-data.component.css'
})
export class HomeDataComponent implements OnInit  {
  products: Product[] = [];
  totalRecords = 0;
  pageSize = 5;
  currentPage = 1;
  searchKeyword = '';
  statusFilter = '';
  isShowModel:boolean =false;
  product: any;
  albumPreviews: string[] = []; 
  quantity: number = 1; // Default quantity
  show:boolean=true;
  selectedProduct: any; // Selected product for the modal

  constructor(private productService: ProductService, private auth: AuthUserService,

    private router:Router,
    private cartService:CartService
  ) {}

  ngOnInit():void {
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
      categoryId: '', // Sửa nếu cần
      optionIds: []
    };

    this.productService.searchProducts(searchParams).subscribe(response => {
      console.log(response)
      this.products = response.data;
    this.totalRecords = response.totalRecords;
    }, error => {
      console.error('Error loading products', error);
    });
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
      this.selectedProduct = this.product; // Set the selected product

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
    // this.show=false;
    //this.router.navigate(['/sign-in'])
    alert('You are not loging!!')
    //return;
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
