import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPendingTransactionsComponent } from './view-pending-transactions.component';

describe('ViewPendingTransactionsComponent', () => {
  let component: ViewPendingTransactionsComponent;
  let fixture: ComponentFixture<ViewPendingTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPendingTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPendingTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
