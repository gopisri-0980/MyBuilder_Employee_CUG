import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarParkingViewComponent } from './car-parking-view.component';

describe('CarParkingViewComponent', () => {
  let component: CarParkingViewComponent;
  let fixture: ComponentFixture<CarParkingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarParkingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarParkingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
