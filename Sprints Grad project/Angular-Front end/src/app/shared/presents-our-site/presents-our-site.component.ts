import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-presents-our-site',
  templateUrl: './presents-our-site.component.html',
  styleUrls: ['./presents-our-site.component.css']
})
export class PresentsOurSiteComponent {

  @Input() isLoggedIn = false;

  constructor() {

  }

}
