import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsPaymentChequeComponent } from './accounts-payment-cheque.component';

describe('AccountsPaymentChequeComponent', () => {
  let component: AccountsPaymentChequeComponent;
  let fixture: ComponentFixture<AccountsPaymentChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsPaymentChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsPaymentChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
