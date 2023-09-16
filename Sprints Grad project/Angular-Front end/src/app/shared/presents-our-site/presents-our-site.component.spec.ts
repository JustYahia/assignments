import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentsOurSiteComponent } from './presents-our-site.component';

describe('PresentsOurSiteComponent', () => {
  let component: PresentsOurSiteComponent;
  let fixture: ComponentFixture<PresentsOurSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentsOurSiteComponent]
    });
    fixture = TestBed.createComponent(PresentsOurSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
