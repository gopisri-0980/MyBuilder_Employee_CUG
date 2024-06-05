import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotificationsForModificationsComponent } from './project-notifications-for-modifications.component';

describe('ProjectNotificationsForModificationsComponent', () => {
  let component: ProjectNotificationsForModificationsComponent;
  let fixture: ComponentFixture<ProjectNotificationsForModificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotificationsForModificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotificationsForModificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
