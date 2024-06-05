import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBankDetailsComponent } from './customer-bank-details.component';

describe('CustomerBankDetailsComponent', () => {
  let component: CustomerBankDetailsComponent;
  let fixture: ComponentFixture<CustomerBankDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBankDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
