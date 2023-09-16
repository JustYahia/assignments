import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  

  constructor(private authService: AuthService, private router: Router,
    private apiService: ApiService) {
   
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get user() {
    return this.authService.user;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate((['/']));
    // this.authService.logout().subscribe({
    //   next: () => {
    //     this.router.navigate(['/']);
    //   },
    //   error: () => {
    //     this.router.navigate(['/']);
    //   },
    // });
  }

  itemsCountInCart() {
    return this.apiService.itemsCount();
  }

}
