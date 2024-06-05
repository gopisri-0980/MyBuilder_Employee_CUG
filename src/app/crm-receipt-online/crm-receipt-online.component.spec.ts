import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmReceiptOnlineComponent } from './crm-receipt-online.component';

describe('CrmReceiptOnlineComponent', () => {
  let component: CrmReceiptOnlineComponent;
  let fixture: ComponentFixture<CrmReceiptOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmReceiptOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmReceiptOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
