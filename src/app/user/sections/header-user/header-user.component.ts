import { Component } from '@angular/core';
import { AuthUserService } from '../../../services/auth.user.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent {
  userName: string | null = null;

  constructor(
    private authUserService: AuthUserService
  ) {
   
  }

  ngOnInit() {
    this.authUserService.setCurrentUser(this.authUserService.getUsernameFromToken())
    this.authUserService.currentUser$.subscribe(user => {
      this.userName = user;
    });
  }

}
