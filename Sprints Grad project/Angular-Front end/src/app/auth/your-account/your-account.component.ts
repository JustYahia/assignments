import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-your-account',
  templateUrl: './your-account.component.html',
  styleUrls: ['./your-account.component.css']
})
export class YourAccountComponent {

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(private authService: AuthService) {}

}
