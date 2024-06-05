import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLedgerDetailsComponent } from './customer-ledger-details.component';

describe('CustomerLedgerDetailsComponent', () => {
  let component: CustomerLedgerDetailsComponent;
  let fixture: ComponentFixture<CustomerLedgerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLedgerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLedgerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
