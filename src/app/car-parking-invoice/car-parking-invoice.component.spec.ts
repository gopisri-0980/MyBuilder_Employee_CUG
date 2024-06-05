import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarParkingInvoiceComponent } from './car-parking-invoice.component';

describe('CarParkingInvoiceComponent', () => {
  let component: CarParkingInvoiceComponent;
  let fixture: ComponentFixture<CarParkingInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarParkingInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarParkingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
