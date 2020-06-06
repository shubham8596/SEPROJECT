import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadbookingComponent } from './loadbooking.component';

describe('LoadbookingComponent', () => {
  let component: LoadbookingComponent;
  let fixture: ComponentFixture<LoadbookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadbookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
