import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmReceiptPaymentComponent } from './crm-receipt-payment.component';

describe('CrmReceiptPaymentComponent', () => {
  let component: CrmReceiptPaymentComponent;
  let fixture: ComponentFixture<CrmReceiptPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmReceiptPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmReceiptPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
