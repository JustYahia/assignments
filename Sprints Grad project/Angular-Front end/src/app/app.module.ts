import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { PicturesModule } from './pictures/pictures.module';
import { LoginComponent } from './auth/login/login.component';
import { appInterceptorProvider } from './app.interseptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    PicturesModule,

  ],
  providers: [LoginComponent, appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
