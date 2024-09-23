import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthUserService } from '../../../services/auth.user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpModuleForm:FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authUserService:AuthUserService,
    private router: Router
  ) {
    // // Khởi tạo form
    this.signUpModuleForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirm_password')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }


  onSubmit(): void {
    if(this.signUpModuleForm.valid){
      const formData = this.signUpModuleForm.value;
      const data = {
        email: formData.email,
        password: formData.password,
        username: formData.username
      }
      this.authUserService.register(data).subscribe(
        response => {
          console.log('Register added:', response);
          this.signUpModuleForm.reset();
          alert('Đăng ký thành công')
          this.router.navigate(['/sign-in']);
        },
        error => {
          console.error('Error adding user:', error);
          alert(this.convertErrorToString(error?.error?.errors))
        }
      );
    }
    else {
      this.signUpModuleForm.markAllAsTouched();
    }

  }
  
  convertErrorToString(errors: Array<string>):string {
    var result = "";
    errors.forEach((error) => {
      result+=error+'\n';

    })
    return result;
  }

}
