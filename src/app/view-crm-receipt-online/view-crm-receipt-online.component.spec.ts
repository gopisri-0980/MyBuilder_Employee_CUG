import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCrmReceiptOnlineComponent } from './view-crm-receipt-online.component';

describe('ViewCrmReceiptOnlineComponent', () => {
  let component: ViewCrmReceiptOnlineComponent;
  let fixture: ComponentFixture<ViewCrmReceiptOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCrmReceiptOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCrmReceiptOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
