import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmPaymentChequeCompletedEDITComponent } from './crm-payment-cheque-completed-edit.component';

describe('CrmPaymentChequeCompletedEDITComponent', () => {
  let component: CrmPaymentChequeCompletedEDITComponent;
  let fixture: ComponentFixture<CrmPaymentChequeCompletedEDITComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmPaymentChequeCompletedEDITComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmPaymentChequeCompletedEDITComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
