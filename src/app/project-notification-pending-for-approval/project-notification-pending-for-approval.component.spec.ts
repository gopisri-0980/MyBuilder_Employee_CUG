import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotificationPendingForApprovalComponent } from './project-notification-pending-for-approval.component';

describe('ProjectNotificationPendingForApprovalComponent', () => {
  let component: ProjectNotificationPendingForApprovalComponent;
  let fixture: ComponentFixture<ProjectNotificationPendingForApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotificationPendingForApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotificationPendingForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
