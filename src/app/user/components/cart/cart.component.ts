import { CommonService } from './../../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../../services/auth.user.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { error } from 'console';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  carts:any[] = []

  constructor(
    private authUser:AuthUserService,
    private router: Router,
    private cartService: CartService,
    private CommonService:CommonService
  ) {

  }

  ngOnInit(): void {
    this.loadCartByUser();
  }

  loadCartByUser():void {
    if(!this.authUser.isLoggedIn()){
      this.router.navigate(['/sign-in']);
    }

    const userId = this.authUser.getUserIdFromToken();

    this.cartService.getCartByUserId(userId).subscribe(response => {      
      this.carts = response.map((item:any)=> {
        return {
          ...item,
          imageUrl: "http://localhost:7038/images/"+item?.product?.image
        }
      });
    }, error => {
      console.error('Error loading categories', error);
    });
  }

  handleDelete(productId:any):void {
    const confirmed = true;

    if (confirmed) {
      const userId = this.authUser.getUserIdFromToken();

      this.cartService.getCartIdByUserId(userId).subscribe(response => {
        const request = {
          "productId": productId+"",
          "cartId": response?.cartId+""
        }
        this.cartService.deleteProductFromCart(request).subscribe(response => {      
          this.loadCartByUser();
          this.CommonService.showAutoCloseAlert("success","Success","Delete successfully");

        }, error => {
          console.error('Error loading products', error);
        });
      }, error=> {
        console.log("Something error!!!")
      })
    } else {
      console.log('Deletion cancelled');
    }
   
  }

  increment(cart: any): void {
    if (cart && cart.quantity >= 1) {
      cart.quantity++;
      this.onQuantityChange(cart);
    }
  }

  decrement(cart: any): void {
    if (cart && cart.quantity > 1) {
      cart.quantity--;
      this.onQuantityChange(cart);
    }
  }

  onQuantityChange(cart: any): void {
    const request = {
      "cartId": cart?.cartId+"",
      "productId": cart?.productId+"",
      "quantity": cart?.quantity+""
    }
    this.cartService.updateQuantityFromCart(request).subscribe(response => {
     
     console.log(response);

    }, error=> {
      console.log("Something error!!!")
    })
    console.log(`Quantity changed for product ${cart.productId}: ${cart.quantity}`);
  }

  clearCart():void {
    if(this.carts.length>0){
      const userId = this.authUser.getUserIdFromToken();

      this.cartService.getCartIdByUserId(userId).subscribe(response => {
        const request = {
          "cartId": response?.cartId+""
        }
        this.cartService.clearCart(request).subscribe(response => {      
          this.loadCartByUser();
          this.CommonService.showAutoCloseAlert("success","Success","Cart has been cleared");
        }, error => {
          console.error('Error clear cart', error);
        });
      }, error=> {
        console.log("Something error!!!")
      })
    }
  }

  calculateTotal(): number {
    return this.carts.reduce((acc, cart) => acc + cart.price * cart.quantity, 0);
  }


}
