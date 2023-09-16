import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { IGetPicture } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-abstract',
  templateUrl: './abstract.component.html',
  styleUrls: ['./abstract.component.css']
})
export class AbstractComponent implements OnInit {

  isLoading: boolean = true;
  picturesList: IGetPicture[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.apiService.getPictures('abstract')
      .subscribe({
        next: (pictures) => {
          this.picturesList = pictures;
          console.log(this.picturesList);

          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          console.log(`Error: ${err}`);
        },
      });
  }
}

