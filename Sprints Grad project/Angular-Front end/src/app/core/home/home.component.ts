import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  constructor(private authService: AuthService) {
    

  }

}
