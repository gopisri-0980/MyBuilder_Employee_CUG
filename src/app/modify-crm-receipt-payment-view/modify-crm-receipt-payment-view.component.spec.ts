import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCrmReceiptPaymentViewComponent } from './modify-crm-receipt-payment-view.component';

describe('ModifyCrmReceiptPaymentViewComponent', () => {
  let component: ModifyCrmReceiptPaymentViewComponent;
  let fixture: ComponentFixture<ModifyCrmReceiptPaymentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyCrmReceiptPaymentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCrmReceiptPaymentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
