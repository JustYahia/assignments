import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.css']
})
export class ShoppingBasketComponent {

  items: any = this.apiService.getItems();

  constructor(private apiService: ApiService, private formBuilder: FormBuilder,
    private authService: AuthService) { }

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });

  onSubmit(): void {
    this.items = this.apiService.clearCart();
    console.warn('Your order has been submitted!', this.checkoutForm.value);
    this.checkoutForm.reset();
    this.authService.deleteItemFromCart();

  }


  // total() {
  //   return this.items.reduce((total:any, item: any) => total + item.price, 0);
  // }

  // removeItem(item: IShoppingItem) {
  //   this.items = this.items.filter((i: any) => i !== item);
  // }

}
