import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmReceiptChequeViewComponent } from './crm-receipt-cheque-view.component';

describe('CrmReceiptChequeViewComponent', () => {
  let component: CrmReceiptChequeViewComponent;
  let fixture: ComponentFixture<CrmReceiptChequeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmReceiptChequeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmReceiptChequeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
