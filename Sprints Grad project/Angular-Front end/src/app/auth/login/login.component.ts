import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IUserLog } from '../../shared/interfaces';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: IUserLog | undefined;

  currentUser: string= ''


  constructor(private router: Router, private authService: AuthService,) {
    
  }

  // loginHandler(form: NgForm): void {
  //   if (form.invalid) { return; }
  
  //   this.authService.loginHandler()
  //   this.router.navigate(["/"]);
  // }

  
 
  

  ngOnInit(): void {
    this.authService.getUsers()

  }

  login(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    
    this.currentUser = form.value.username;
    this.authService.login(this.currentUser);
    this.router.navigate(["/"]);
  }

  // loginHandler(form: NgForm): void {
  //   if (form.invalid) { return; }
  //    console.log(form.value.username);

  //   this.authService.checkUserExist()
      

  //   // this.isLoading = false;
  // }

  // logout(): void {
  //   this.user = undefined;
  //   localStorage.removeItem(this.USER_);
  // }



  // getUser() {
  //   try {
  //     const lsUser = localStorage.getItem(this.USER_) || '';
  //     // console.log(lsUser);

  //     this.user = JSON.parse(lsUser);
  //     console.log(this.user);

  //   } catch (error) {
  //     this.user = undefined;
  //   }

  // }


  // isUserCorrect(form: NgForm) {
  //   return this.usersList.some(usernames =>
  //     usernames.username === form.value.username);
  //   if(isUsernameCorrect) {

  //     this.router.navigate(["/"]);
  //   }
  // }
}

