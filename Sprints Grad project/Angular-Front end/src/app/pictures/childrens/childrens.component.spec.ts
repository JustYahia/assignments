import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrensComponent } from './childrens.component';

describe('ChildrensComponent', () => {
  let component: ChildrensComponent;
  let fixture: ComponentFixture<ChildrensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrensComponent]
    });
    fixture = TestBed.createComponent(ChildrensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
