import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetPicture, IPicture } from './shared/interfaces';
import { map } from 'rxjs/operators';
import { environment } from 'src/enveronments/environment-development';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  picturesList2: IGetPicture[] = []

  pictureToCart: IPicture | undefined;
  getPicFromCart: IPicture | undefined;

  items: IPicture[] = [];
  
  constructor(private http: HttpClient) { }

  getPictures(picturePath: string) {
    const { apiUrl } = environment;
    return this.http.get<{ [picId: string]: IGetPicture }>(`${apiUrl}/${picturePath}.json`)
      .pipe(map(resData => {
        const picturesArray = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            picturesArray.push({ picId: key, ...resData[key] });
          }
        }
        return picturesArray;
      }))
  }

  getPicture(category: string, id: string) {
    const { apiUrl } = environment;
    return this.http.get<IPicture>(`${apiUrl}${category}${id}.json`)
  }

  createItemInMyCart(picName: string, picImage: string,
    picPrice: number, picDescription: string) {
    return this.http.post<IPicture>(`https://my-project-angular-4dd57-default-rtdb.europe-west1.firebasedatabase.app/MyCart.json`,
      { picName, picImage, picPrice, picDescription });
  }

  getPicToBeAddToCart(category: string, id: string) {
    const { apiUrl } = environment;
    return this.http.get<IPicture>(`${apiUrl}${category}${id}.json`);
  }

  getItemFromMyCart(id: string) {
    const { apiUrl } = environment;
    return this.http.get<IPicture>(`https://my-project-angular-4dd57-default-rtdb.europe-west1.firebasedatabase.app/MyCart/${id}.json`)
      .subscribe({
        next: (pic) => {
          this.getPicFromCart = pic;
          this.items.push(this.getPicFromCart);
        },
        error: (err) => {
          console.log(`Error: ${err} `);
        }
      })
  }

  getItems() {
    return this.items;
  }

  itemsCount() {
    return this.items.length;
  }

  clearCart() {
    this.items = [];
  }

  editPicture(picName: string, pickMaterials: string, picCategory: string,
    picImage: string, picPrice: number, picDescription: string, id: string) {
    return this.http.put<any>(`https://my-project-angular-4dd57-default-rtdb.europe-west1.firebasedatabase.app/${picCategory}/${id}.json`,
      { picName, pickMaterials, picCategory, picImage, picPrice, picDescription, id });
  }

  deletePic(category: string, id: string) { 
    return this.http.delete<IPicture>(`${apiUrl}${category}${id}.json`);
  }

}
