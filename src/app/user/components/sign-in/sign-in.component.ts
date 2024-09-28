import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../../../services/auth.user.service';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInModuleForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authUserService:AuthUserService,
    private router: Router,
    private CommonService:CommonService
  ) {
    // // Khởi tạo form
    this.signInModuleForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit():void {
    if(this.signInModuleForm.valid){
      const email = this.signInModuleForm.value.email;
      const password = this.signInModuleForm.value.password;
      this.authUserService.login(email, password).subscribe(
        (response) => {
          if (response.success) {
            this.authUserService.saveTokenUser(response.token);
            this.authUserService.setCurrentUser(this.authUserService.getUsernameFromToken());
            this.CommonService.showAutoCloseAlert("success","Success","Sign in successfully");
            this.router.navigate(['/']);
          } else {
            this.CommonService.showAutoCloseAlert("error","error","Sign in failed");
          }
        },
        (error:any) => {
          // alert('Error logging in: ' + error.message);
          this.CommonService.showAutoCloseAlert("error","error","Sign in failed");
        }
      );

    }else {
      this.signInModuleForm.markAllAsTouched();
    }
  }
}
