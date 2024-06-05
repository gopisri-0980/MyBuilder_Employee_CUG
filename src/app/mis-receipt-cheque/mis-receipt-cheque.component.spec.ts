import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReceiptChequeComponent } from './mis-receipt-cheque.component';

describe('MisReceiptChequeComponent', () => {
  let component: MisReceiptChequeComponent;
  let fixture: ComponentFixture<MisReceiptChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisReceiptChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisReceiptChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
