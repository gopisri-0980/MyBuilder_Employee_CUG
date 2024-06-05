import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPendingTransactionsStatusComponent } from './view-pending-transactions-status.component';

describe('ViewPendingTransactionsStatusComponent', () => {
  let component: ViewPendingTransactionsStatusComponent;
  let fixture: ComponentFixture<ViewPendingTransactionsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPendingTransactionsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPendingTransactionsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
