import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitesComponent } from './portraites.component';

describe('PortraitesComponent', () => {
  let component: PortraitesComponent;
  let fixture: ComponentFixture<PortraitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortraitesComponent]
    });
    fixture = TestBed.createComponent(PortraitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
