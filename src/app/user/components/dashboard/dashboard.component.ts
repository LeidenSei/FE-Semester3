import { Component } from '@angular/core';
import { AuthUserService } from '../../../services/auth.user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private authUserService: AuthUserService,
    private router: Router
  ) {

  }

  handleLogout():void {
    this.authUserService.logout();
    alert("Logout successfully")
    this.router.navigate(['/sign-in'])
    this.authUserService.setCurrentUser(null)

  }
}
