import { Component } from '@angular/core';
import { AuthUserService } from '../../../services/auth.user.service';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-info-edit',
  templateUrl: './dashboard-info-edit.component.html',
  styleUrl: './dashboard-info-edit.component.css'
})
export class DashboardInfoEditComponent {
  user:any;
  editForm:FormGroup;
  constructor(
    private fb: FormBuilder,
    private authUserService: AuthUserService,
    private accountService: AccountService,
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
    this.accountService.getAccountById(userId).subscribe(response => {
      const data = {
        ...response,
        imageUrl: (response?.avatar!=null&&response?.avatar!='')?('http://localhost:7038/images/'+response?.avatar): ''
      }
      this.editForm.patchValue({
        username: data.userName,
        email: data.email,
        phone: data.phoneNumber,
        address: data.address
      });
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
