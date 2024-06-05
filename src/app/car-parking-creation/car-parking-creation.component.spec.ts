import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarParkingCreationComponent } from './car-parking-creation.component';

describe('CarParkingCreationComponent', () => {
  let component: CarParkingCreationComponent;
  let fixture: ComponentFixture<CarParkingCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarParkingCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarParkingCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
