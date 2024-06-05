import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReceiptOnlineComponent } from './mis-receipt-online.component';

describe('MisReceiptOnlineComponent', () => {
  let component: MisReceiptOnlineComponent;
  let fixture: ComponentFixture<MisReceiptOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisReceiptOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisReceiptOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
