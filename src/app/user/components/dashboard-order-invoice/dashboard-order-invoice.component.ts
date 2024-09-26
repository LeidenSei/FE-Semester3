import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthUserService } from '../../../services/auth.user.service';
import { AccountService } from '../../../services/account.service';
import { OrderService } from '../../../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-order-invoice',
  templateUrl: './dashboard-order-invoice.component.html',
  styleUrl: './dashboard-order-invoice.component.css'
})
export class DashboardOrderInvoiceComponent implements OnInit {
  user:any;
  orders:any[] = [];
  order:any;
  editForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authUserService: AuthUserService,
    private accountService: AccountService,
    private orderService: OrderService,
    private navigate: ActivatedRoute,
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
    this.navigate.paramMap.subscribe(params => {
      const orderId = params.get('id');
      this.orderService.getOrderByUserId(userId).subscribe(response => {
        this.order = response.filter((item:any) => item.orderId == orderId)[0];
       }, error=> {
         console.log("Something error!!!")
       })
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
