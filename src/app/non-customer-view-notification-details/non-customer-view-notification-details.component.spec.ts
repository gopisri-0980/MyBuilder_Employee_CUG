import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonCustomerViewNotificationDetailsComponent } from './non-customer-view-notification-details.component';

describe('NonCustomerViewNotificationDetailsComponent', () => {
  let component: NonCustomerViewNotificationDetailsComponent;
  let fixture: ComponentFixture<NonCustomerViewNotificationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonCustomerViewNotificationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonCustomerViewNotificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
