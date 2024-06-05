import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmReceiptChequeCompletedEDITComponent } from './crm-receipt-cheque-completed-edit.component';

describe('CrmReceiptChequeCompletedEDITComponent', () => {
  let component: CrmReceiptChequeCompletedEDITComponent;
  let fixture: ComponentFixture<CrmReceiptChequeCompletedEDITComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmReceiptChequeCompletedEDITComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmReceiptChequeCompletedEDITComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
