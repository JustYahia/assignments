import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGetUser } from 'src/app/shared/interfaces';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  // userList: IGetUser | undefined;
  // isLoading: boolean = true;

  // constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {}

  // ngOnInit(): void {
  //   const id: string = this.activatedRoute.snapshot.params['userId'];
  //   console.log(id);

  //   this.authService.getUser(id)
  //   .subscribe({
  //     next: (user) => {
  //       this.userList = user;
  //       // console.log(this.userList);
  //       // this.isLoading = false;
  //     },
  //     error: (err) => {
  //       // this.isLoading = false;
  //       console.log(`Error: ${err}`);
  //     },
  //   })
  // }

}
