import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCarparkingInvoiceComponent } from './approve-carparking-invoice.component';

describe('ApproveCarparkingInvoiceComponent', () => {
  let component: ApproveCarparkingInvoiceComponent;
  let fixture: ComponentFixture<ApproveCarparkingInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveCarparkingInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCarparkingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
