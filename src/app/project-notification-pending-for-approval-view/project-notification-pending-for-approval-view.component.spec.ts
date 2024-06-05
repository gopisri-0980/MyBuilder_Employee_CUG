import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotificationPendingForApprovalViewComponent } from './project-notification-pending-for-approval-view.component';

describe('ProjectNotificationPendingForApprovalViewComponent', () => {
  let component: ProjectNotificationPendingForApprovalViewComponent;
  let fixture: ComponentFixture<ProjectNotificationPendingForApprovalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotificationPendingForApprovalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotificationPendingForApprovalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
