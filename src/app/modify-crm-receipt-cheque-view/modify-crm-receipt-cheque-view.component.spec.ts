import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCrmReceiptChequeViewComponent } from './modify-crm-receipt-cheque-view.component';

describe('ModifyCrmReceiptChequeViewComponent', () => {
  let component: ModifyCrmReceiptChequeViewComponent;
  let fixture: ComponentFixture<ModifyCrmReceiptChequeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyCrmReceiptChequeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCrmReceiptChequeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
