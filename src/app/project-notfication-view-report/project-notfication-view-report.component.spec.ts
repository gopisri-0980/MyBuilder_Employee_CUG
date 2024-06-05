import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNotficationViewReportComponent } from './project-notfication-view-report.component';

describe('ProjectNotficationViewReportComponent', () => {
  let component: ProjectNotficationViewReportComponent;
  let fixture: ComponentFixture<ProjectNotficationViewReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNotficationViewReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNotficationViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
