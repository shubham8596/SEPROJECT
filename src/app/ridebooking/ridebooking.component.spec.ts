import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidebookingComponent } from './ridebooking.component';

describe('RidebookingComponent', () => {
  let component: RidebookingComponent;
  let fixture: ComponentFixture<RidebookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidebookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
