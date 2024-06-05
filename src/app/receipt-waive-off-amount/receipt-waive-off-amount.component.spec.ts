import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptWaiveOffAmountComponent } from './receipt-waive-off-amount.component';

describe('ReceiptWaiveOffAmountComponent', () => {
  let component: ReceiptWaiveOffAmountComponent;
  let fixture: ComponentFixture<ReceiptWaiveOffAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptWaiveOffAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptWaiveOffAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
