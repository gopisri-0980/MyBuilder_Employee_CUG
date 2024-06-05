import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePendingInvoiceComponent } from './approve-pending-invoice.component';

describe('ApprovePendingInvoiceComponent', () => {
  let component: ApprovePendingInvoiceComponent;
  let fixture: ComponentFixture<ApprovePendingInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePendingInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePendingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
