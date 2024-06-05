import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectwiseEscalationReportComponent } from './projectwise-escalation-report.component';

describe('ProjectwiseEscalationReportComponent', () => {
  let component: ProjectwiseEscalationReportComponent;
  let fixture: ComponentFixture<ProjectwiseEscalationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectwiseEscalationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectwiseEscalationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
