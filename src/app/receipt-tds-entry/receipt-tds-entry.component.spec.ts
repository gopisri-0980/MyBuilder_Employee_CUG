import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptTdsEntryComponent } from './receipt-tds-entry.component';

describe('ReceiptTdsEntryComponent', () => {
  let component: ReceiptTdsEntryComponent;
  let fixture: ComponentFixture<ReceiptTdsEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptTdsEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptTdsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
