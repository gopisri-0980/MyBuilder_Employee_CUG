import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPaymentChequeComponent } from './mis-payment-cheque.component';

describe('MisPaymentChequeComponent', () => {
  let component: MisPaymentChequeComponent;
  let fixture: ComponentFixture<MisPaymentChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPaymentChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPaymentChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
