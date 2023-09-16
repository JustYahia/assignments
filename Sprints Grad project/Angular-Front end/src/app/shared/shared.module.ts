import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentsOurSiteComponent } from './presents-our-site/presents-our-site.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    LoaderComponent,
    PresentsOurSiteComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    LoaderComponent,
    PresentsOurSiteComponent,
  ]
})
export class SharedModule { }
