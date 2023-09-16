import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthModule } from '../auth/auth.module';
import { LoginComponent } from '../auth/login/login.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,  
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AuthModule,
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
})
export class CoreModule { }
