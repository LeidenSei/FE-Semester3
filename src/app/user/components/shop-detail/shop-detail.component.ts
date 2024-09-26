import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { SearchParams } from '../../../services/search-params';
import { AuthUserService } from '../../../services/auth.user.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrl: './shop-detail.component.css'
})
export class ShopDetailComponent implements OnInit{
  products: Product[] = [];
  product:any;
  categories: any; 
  totalRecords = 0;
  pageSize = 4;
  currentPage = 1;
  imagePreview: string | ArrayBuffer | null = null;
  searchKeyword = '';
  statusFilter = '';
  albumPreviews: string[] = []; 
  quantity: number = 1; // Default quantity

 
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private auth: AuthUserService,
    private navgiate: Router,
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.loadProduct();
   
  }

  loadProduct() {
    this.router.paramMap.subscribe(params => {
      const productId = params.get('id');
      this.productService.getProductById(productId).subscribe(response => {
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
        this.loadRelateProduct(this.product?.categoryId);
      }, error => {
        console.error('Error loading products', error);
      });
    });
   
  }

  loadRelateProduct(id:any) {
    const searchParams: SearchParams = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
      keyword: this.searchKeyword,
      status: this.statusFilter,
      sortBy: '',
      sortDir: '',
      toPrice: 0,
      fromPrice: 0,
      categoryId: (id!=undefined|| id!=null)?id+'':'',
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

  addToCart(productId1:string) {
    //check xem login chưa
   if(!this.auth.isLoggedIn()){
    alert('You are not loging!!')
    this.navgiate.navigate(['/sign-in'])
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
  
}
