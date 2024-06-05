import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmReceiptOnlineCompletedEDITComponent } from './crm-receipt-online-completed-edit.component';

describe('CrmReceiptOnlineCompletedEDITComponent', () => {
  let component: CrmReceiptOnlineCompletedEDITComponent;
  let fixture: ComponentFixture<CrmReceiptOnlineCompletedEDITComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmReceiptOnlineCompletedEDITComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmReceiptOnlineCompletedEDITComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
