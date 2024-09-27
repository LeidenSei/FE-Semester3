import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private commonService:CommonService) {}

  async canActivate(): Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      if (await this.authService.isAdmin()) {
        return true;
      }
    }

      this.commonService.showAutoCloseAlert("warning","Notice","You must login to continue")
      return false;
  }
}