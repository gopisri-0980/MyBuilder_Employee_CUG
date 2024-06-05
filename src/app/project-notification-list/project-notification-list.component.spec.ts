import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotificationListComponent } from './project-notification-list.component';

describe('ProjectNotificationListComponent', () => {
  let component: ProjectNotificationListComponent;
  let fixture: ComponentFixture<ProjectNotificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
