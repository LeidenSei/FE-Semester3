import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      if (await this.authService.isAdmin()) {
        return true;
      } else {
        await this.router.navigate(['/login-admin']);
        return false;
      }
    } else {
      await this.router.navigate(['/login-admin']);
      return false;
    }
  }
}