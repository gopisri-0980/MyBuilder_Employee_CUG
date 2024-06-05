import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNotificationsViewDetailsComponent } from './all-notifications-view-details.component';

describe('AllNotificationsViewDetailsComponent', () => {
  let component: AllNotificationsViewDetailsComponent;
  let fixture: ComponentFixture<AllNotificationsViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNotificationsViewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNotificationsViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
