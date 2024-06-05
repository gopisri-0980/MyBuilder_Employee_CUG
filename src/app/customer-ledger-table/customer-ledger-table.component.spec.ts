import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLedgerTableComponent } from './customer-ledger-table.component';

describe('CustomerLedgerTableComponent', () => {
  let component: CustomerLedgerTableComponent;
  let fixture: ComponentFixture<CustomerLedgerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLedgerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLedgerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
