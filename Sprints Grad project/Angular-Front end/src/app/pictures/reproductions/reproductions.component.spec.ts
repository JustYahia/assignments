import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproductionsComponent } from './reproductions.component';

describe('ReproductionsComponent', () => {
  let component: ReproductionsComponent;
  let fixture: ComponentFixture<ReproductionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReproductionsComponent]
    });
    fixture = TestBed.createComponent(ReproductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
