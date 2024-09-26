import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthUserService } from '../../../services/auth.user.service';
import { CartService } from '../../../services/cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent implements OnInit{
  userName: string | null = null;
  carts:any[] = []
  totalItems:any;
  isShow:boolean= false;

  constructor(
    private authUserService: AuthUserService,
    private cartService : CartService,
    private router: Router
  ) {
   
  }

  ngOnInit() {
    this.loadCartByUser();
    this.authUserService.setCurrentUser(this.authUserService.getUsernameFromToken())
    this.authUserService.currentUser$.subscribe(user => {
      this.userName = user;
    });
    this.cartService.cartItems$.subscribe(items => {
      this.calculateTotal();
      this.totalItems = items.length;
    });

  }

  loadCartByUser():void {

    if(!this.authUserService.isLoggedIn()){
      this.router.navigate(['/sign-in']);
    }

    this.cartService.cartItems$.subscribe(items => {
      this.carts = items.map((item:any)=> {
        return {
          ...item,
          imageUrl: "http://localhost:7038/images/"+item?.product?.image
        }
      });
    });

  }

  calculateTotal(): number {
    return this.carts.reduce((acc, cart) => acc + cart.price * cart.quantity, 0);
  }
 
  handleShowModal() {
    this.isShow = !this.isShow;
  }
}
