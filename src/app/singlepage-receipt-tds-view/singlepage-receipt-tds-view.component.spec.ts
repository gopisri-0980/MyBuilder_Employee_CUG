import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepageReceiptTdsViewComponent } from './singlepage-receipt-tds-view.component';

describe('SinglepageReceiptTdsViewComponent', () => {
  let component: SinglepageReceiptTdsViewComponent;
  let fixture: ComponentFixture<SinglepageReceiptTdsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglepageReceiptTdsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepageReceiptTdsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
