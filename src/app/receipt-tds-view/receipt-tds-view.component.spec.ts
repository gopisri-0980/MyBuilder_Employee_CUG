import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptTdsViewComponent } from './receipt-tds-view.component';

describe('ReceiptTdsViewComponent', () => {
  let component: ReceiptTdsViewComponent;
  let fixture: ComponentFixture<ReceiptTdsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptTdsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptTdsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
