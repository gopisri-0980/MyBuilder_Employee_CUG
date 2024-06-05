import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmChequeReceiptComponent } from './crm-cheque-receipt.component';

describe('CrmChequeReceiptComponent', () => {
  let component: CrmChequeReceiptComponent;
  let fixture: ComponentFixture<CrmChequeReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmChequeReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmChequeReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
