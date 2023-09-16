import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { IGetPicture } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-nature',
  templateUrl: './nature.component.html',
  styleUrls: ['./nature.component.css']
})
export class NatureComponent implements OnInit {

  isLoading: boolean = true;
  picturesList: IGetPicture[] = []

  constructor(private apiService: ApiService, private authService: AuthService) {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    this.apiService.getPictures('nature')
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
