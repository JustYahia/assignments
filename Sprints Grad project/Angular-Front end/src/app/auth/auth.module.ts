import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { YourAccountComponent } from './your-account/your-account.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatePictureComponent } from './create-picture/create-picture.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AccountComponent,
    YourAccountComponent,
    CreatePictureComponent,
    UserDetailsComponent,
    EditAccountComponent,
    ShoppingBasketComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,  
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    YourAccountComponent,
    CreatePictureComponent,
    UserDetailsComponent,
    EditAccountComponent,
    ShoppingBasketComponent, 
  ],
  providers: [AccountComponent]

})
export class AuthModule { }
