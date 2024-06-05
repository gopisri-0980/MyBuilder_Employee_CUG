import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmReceiptPaymentViewComponent } from './crm-receipt-payment-view.component';

describe('CrmReceiptPaymentViewComponent', () => {
  let component: CrmReceiptPaymentViewComponent;
  let fixture: ComponentFixture<CrmReceiptPaymentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmReceiptPaymentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmReceiptPaymentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
