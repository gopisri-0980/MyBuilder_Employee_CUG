import { TestBed } from '@angular/core/testing';

import { ProjectwiseEscalationReportService } from './projectwise-escalation-report.service';

describe('ProjectwiseEscalationReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectwiseEscalationReportService = TestBed.get(ProjectwiseEscalationReportService);
    expect(service).toBeTruthy();
  });
});
