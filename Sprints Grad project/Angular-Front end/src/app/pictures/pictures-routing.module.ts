import { RouterModule, Routes } from '@angular/router';
import { AbstractComponent } from './abstract/abstract.component';
import { AnimalsComponent } from './animals/animals.component';
import { AutoComponent } from './auto/auto.component';
import { ChildrensComponent } from './childrens/childrens.component';
import { FlowersComponent } from './flowers/flowers.component';
import { FoodAndDrinksComponent } from './food-and-drinks/food-and-drinks.component';
import { NatureComponent } from './nature/nature.component';
import { PortraitesComponent } from './portraites/portraites.component';
import { ReproductionsComponent } from './reproductions/reproductions.component';
import { PictureDetailsComponent } from './picture-details/picture-details.component';



const routes: Routes = [
  {
    path: 'picture/abstract',
    component: AbstractComponent,
  },
  {
    path: 'picture/animals',
    component: AnimalsComponent,
  },
  {
    path: 'picture/auto',
    component: AutoComponent,
  },
  {
    path: 'picture/childrens',
    component: ChildrensComponent,
  },
  {
    path: 'picture/flowers',
    component: FlowersComponent,
  },
  {
    path: 'picture/foodAndDrinks',
    component: FoodAndDrinksComponent,
  },
  {
    path: 'picture/nature',
    component: NatureComponent,
  },
  {
    path: 'picture/portraites',
    component: PortraitesComponent,
  },
  {
    path: 'picture/reproductions',
    component: ReproductionsComponent,
  },
  {
    path: 'picture/abstract/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/animals/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/auto/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/childrens/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/flowers/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/foodAndDrinks/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/nature/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/portraites/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/reproductions/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/abstract/edit/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/animals/edit/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/auto/edit/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/childrens/edit/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/flowers/edit/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/foodAndDrinks/edit/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/nature/edit/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/portraites/edit/:picId',
    component: PictureDetailsComponent,
  },
  {
    path: 'picture/reproductions/edit/:picId',
    component: PictureDetailsComponent,
  },

];

export const PictureRoutingModule = RouterModule.forChild(routes);
