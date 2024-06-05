import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearedTransactionReportComponent } from './cleared-transaction-report.component';

describe('ClearedTransactionReportComponent', () => {
  let component: ClearedTransactionReportComponent;
  let fixture: ComponentFixture<ClearedTransactionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearedTransactionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearedTransactionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
