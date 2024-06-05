import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsReceiptChequeComponent } from './accounts-receipt-cheque.component';

describe('AccountsReceiptChequeComponent', () => {
  let component: AccountsReceiptChequeComponent;
  let fixture: ComponentFixture<AccountsReceiptChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsReceiptChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsReceiptChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
