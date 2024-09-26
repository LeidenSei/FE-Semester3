import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthUserService } from '../../../services/auth.user.service';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-dashboard-order',
  templateUrl: './dashboard-order.component.html',
  styleUrl: './dashboard-order.component.css'
})
export class DashboardOrderComponent {
  user:any;
  orders:any[] = [];
  editForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authUserService: AuthUserService,
    private accountService: AccountService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      username: [this.user?.userName],
      email : [''],
      address: [this.user?.address],
      phone: [this.user?.phone]
    });
  }

  ngOnInit(): void {
    this.loadUser();
  }


  loadUser() {
    const userId = this.authUserService.getUserIdFromToken();
    this.orderService.getOrderByUserId(userId).subscribe(response => {

      // this.editForm.patchValue({
      //   username: data.userName,
      //   email: data.email,
      //   phone: data.phoneNumber,
      //   address: data.address
      // });
      this.orders = response;
 
     }, error=> {
       console.log("Something error!!!")
     })

     this.accountService.getAccountById(userId).subscribe(response => {
      const data = {
        ...response,
        imageUrl: (response?.avatar!=null&&response?.avatar!='')?('http://localhost:7038/images/'+response?.avatar): ''
      }
      this.user = data;
 
     }, error=> {
       console.log("Something error!!!")
     })
  }

  handleLogout():void {
    this.authUserService.logout();
    alert("Logout successfully")
    this.router.navigate(['/sign-in'])
    this.authUserService.setCurrentUser(null)

  }

  onSubmit() {
    const id = this.authUserService.getUserIdFromToken();
    const data = this.editForm.value;
    this.accountService.saveAccount(data, id).subscribe(response => {
     console.log(response);
     alert("Update successfully")
     this.router.navigate(['/dashboard'])
    }, error => {
      console.error('Error loading posts', error);
    });
  }
}
