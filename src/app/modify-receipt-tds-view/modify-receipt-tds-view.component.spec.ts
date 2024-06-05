import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyReceiptTdsViewComponent } from './modify-receipt-tds-view.component';

describe('ModifyReceiptTdsViewComponent', () => {
  let component: ModifyReceiptTdsViewComponent;
  let fixture: ComponentFixture<ModifyReceiptTdsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyReceiptTdsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyReceiptTdsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
