import { CommonService } from './../../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../../services/auth.user.service';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user:any;
  constructor(
    private authUserService: AuthUserService,
    private accountService: AccountService,
    private router: Router,
    private CommonService:CommonService
  ) {

  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    const userId = this.authUserService.getUserIdFromToken();
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
    this.CommonService.showAutoCloseAlert("success","Success","Log out successfully");
    this.router.navigate(['/sign-in'])
    this.authUserService.setCurrentUser(null)

  }
}
