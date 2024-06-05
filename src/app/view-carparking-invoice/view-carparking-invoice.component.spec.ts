import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCarparkingInvoiceComponent } from './view-carparking-invoice.component';

describe('ViewCarparkingInvoiceComponent', () => {
  let component: ViewCarparkingInvoiceComponent;
  let fixture: ComponentFixture<ViewCarparkingInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCarparkingInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCarparkingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
