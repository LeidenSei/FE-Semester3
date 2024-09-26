import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../../../services/auth.user.service';
import { Router } from '@angular/router';

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
            alert('Login successfully');
            this.router.navigate(['/']);
          } else {
            alert('Login failed');
          }
        },
        (error:any) => {
          // alert('Error logging in: ' + error.message);
          alert('Login failed');
        }
      );

    }else {
      this.signInModuleForm.markAllAsTouched();
    }
  }
}
