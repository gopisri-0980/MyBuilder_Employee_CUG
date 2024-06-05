import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonCustomerNotificationslistComponent } from './non-customer-notificationslist.component';

describe('NonCustomerNotificationslistComponent', () => {
  let component: NonCustomerNotificationslistComponent;
  let fixture: ComponentFixture<NonCustomerNotificationslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonCustomerNotificationslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonCustomerNotificationslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
