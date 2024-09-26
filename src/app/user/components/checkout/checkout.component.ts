import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../../services/auth.user.service';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  username: any;
  email: any;
  orderForm:FormGroup;
  carts:any[] = []
  totalAmount:any;
  constructor(
    private authService: AuthUserService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      address: [''],
    });
  }

  ngOnInit(): void {
    this.loadData();

  }

  loadData() {
    this.username = this.authService.getUsernameFromToken();
    this.email = this.authService.getEmailFromToken();
    this.loadCartByUser();
  }

  onSumit() {
   
    if(this.carts.length<=0){
      this.router.navigate(['/shop']);
    }
    const userId = this.authService.getUserIdFromToken();
    const total = this.totalAmount;
    const shippingAddress = this.orderForm.value.address;
    const request = {
      userId: userId,
      status: 'Ordered',
      shippingAddress: shippingAddress,
      totalAmount: total
    }
    //call api
    this.orderService.createOrder(request).subscribe(
      response => {
        console.log(response);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('cart')
      } 
        this.router.navigate(['/']);
      },
      error => {
        alert("Create order fails");
      }
    );

  }

  loadCartByUser():void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/sign-in']);
    }

    const userId = this.authService.getUserIdFromToken();

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

  calculateTotal(): number {
   this.totalAmount= this.carts.reduce((acc, cart) => acc + cart.price * cart.quantity, 0);
   return this.carts.reduce((acc, cart) => acc + cart.price * cart.quantity, 0);
  }
}
