import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../Models/Login';
import { log } from 'console';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',  
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  LoginModel:Login = new Login();

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    await this.authService.logout(); 
    this.authService.login(this.LoginModel.email, this.LoginModel.password).subscribe(
      (response) => {
        if (response.success) {
          this.authService.saveTokenUser(response.token);
          this.router.navigate(['/admin']);
        } else {
          alert('Login failed');
        }
      },
      (error) => {
        alert('Error logging in: ' + error.message);
      }
    );
  }
}
