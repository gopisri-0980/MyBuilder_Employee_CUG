import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewandApproveNotificationsComponent } from './viewand-approve-notifications.component';

describe('ViewandApproveNotificationsComponent', () => {
  let component: ViewandApproveNotificationsComponent;
  let fixture: ComponentFixture<ViewandApproveNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewandApproveNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewandApproveNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
