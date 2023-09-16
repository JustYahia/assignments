import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IPicture } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-picture-details',
  templateUrl: './picture-details.component.html',
  styleUrls: ['./picture-details.component.css']
})
export class PictureDetailsComponent implements OnInit {

  picture: IPicture | undefined;
  isLoading: boolean = true;
  pictureToCart: IPicture | undefined;

  myCurrPicture: any

  category: any;

  routerEvents: any;

  isEditMode: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService,
    private authService: AuthService, private router: Router) {
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {

    const url = this.router.routerState.snapshot.url;
    let regExp = /(\/[a-zA-Z]*)(\/[a-zA-Z]*\/)/gm
    const result: any = regExp.exec(url);
    this.category = result[2]
    
    const id: string = this.activatedRoute.snapshot.params['picId'];

    this.apiService.getPicture(result[2], id).subscribe({
      next: (pic) => {
        this.picture = pic;
        console.log(this.picture);

      },
      error: (err) => {
        console.log(`Error: ${err}`);
      },
    })
  }

  backToList(): void {
    this.router.navigate([`/picture${this.category}`]);
  }

  addPicToCart() {

    const url = this.router.routerState.snapshot.url;
    let regExp = /(\/[a-zA-Z]*)(\/[a-zA-Z]*\/)/gm
    const result: any = regExp.exec(url);
    console.log(result);

    const id: string = this.activatedRoute.snapshot.params['picId'];
    console.log(id);

    console.log(this.picture);

    this.apiService.getPicToBeAddToCart(result[2], id)
      .subscribe({
        next: (pic) => {
          this.pictureToCart = pic;

          this.apiService.createItemInMyCart(this.pictureToCart.picName,
            this.pictureToCart.picImage, this.pictureToCart.picPrice,
            this.pictureToCart.picDescription)
            .subscribe({
              next: (id: any) => {
                console.log(id);
                this.apiService.getItemFromMyCart(id.name);
              }
            })
        },
        error: (err) => {
          console.log(`Error: ${err}`);
        }
      })

    window.alert('The picture has been added to the cart!');
  }

  editPic() {
    const id: string = this.activatedRoute.snapshot.params['picId'];

    this.router.navigate([`/picture${this.category}edit/${id}`]);
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  cancelForm(): void {
    const id: string = this.activatedRoute.snapshot.params['picId'];
    this.router.navigate([`/picture${this.category}${id}`]);
  }

  savePicture(form: NgForm): void {
    const id: string = this.activatedRoute.snapshot.params['picId'];
    const { picName, pickMaterials, picCategory, picImage, picPrice, picDescription } = form.value;
    this.apiService.editPicture(picName, pickMaterials, picCategory, picImage,
      picPrice, picDescription, id).subscribe(
        response => { console.log(response); this.router.navigate([`/picture${this.category}`]) },
        (err) => console.log(err)
      )
  }

  deletePicture() {
    const id: string = this.activatedRoute.snapshot.params['picId'];
    if (confirm('Are you sure?')) {
      this.apiService.deletePic(this.category, id);
      this.router.navigate([`/`]);
    }
  }
}

