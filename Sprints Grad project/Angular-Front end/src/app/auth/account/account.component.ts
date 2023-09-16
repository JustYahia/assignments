import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { IGetUser, IUser, IUserLog } from 'src/app/shared/interfaces';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  showEditMode: boolean = false;
  usersDetails: IUser[] = [];
  isLoading: boolean = true;

  id: string = ''
  

  // userInfo: IUser | null = null
  

  userInfo: any = {
    // userId: '',
    // username: '',
    // firstname: '',
    // secondname: '',
    // lastname: '',
    // email: '',
    // phone: '',
    // country: '',
    // place: '',
    // postcode: '',
    // street: '',
    // password: '',
    // rePassword: ''
  };

  
  
  constructor(private fb: FormBuilder, private router: Router,
  private authService: AuthService, private activatedRoute: ActivatedRoute) {
    
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {

    this.authService.getUserDetails()
    .subscribe({
      next: (user) => {
        this.usersDetails= user;
        const indexInArrayLoggedinObjectUser = this.usersDetails.findIndex(x => 
          x.username === this.authService.currentUser);

          const myUserObj: any = this.usersDetails[indexInArrayLoggedinObjectUser];
          
          for(const key in myUserObj) {
            if (myUserObj.hasOwnProperty(key)) {
              this.userInfo[key] = (myUserObj[key]); 
              // if(this.userInfo.hasOwnProperty(key)) {
              // }
            }
          }
          this.id = this.userInfo.userId
          
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(`Error: ${err}`);
      },
    }) 
    
    
  }

  // ddd(): void {
  //   this.router.navigate(["/auth/profile/account/edit"])
  //   // this.showEditMode = !this.showEditMode;
  // }

  // toggleEditMode(): void {
  //   this.showEditMode = !this.showEditMode;
  // }

  redirectToEditComponent() {
    this.router.navigate([`/auth/profile/account/edit/${this.userInfo.userId}`]);
  }

  closeAccountForm(): void {
    this.router.navigate(["/auth/profile"]);
  }
}


// userList: IGetUser | undefined;
//   isLoading: boolean = true;

//   constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {}

//   ngOnInit(): void {
//     const id: string = this.activatedRoute.snapshot.params['userId'];
//     console.log(id);

//     this.authService.getUser(id)
//     .subscribe({
//       next: (user) => {
//         this.userList = user;
//         console.log(this.userList);
//         // this.isLoading = false;
//       },
//       error: (err) => {
//         // this.isLoading = false;
//         console.log(`Error: ${err}`);
//       },
//     })
//   }
