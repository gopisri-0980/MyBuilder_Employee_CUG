import { TestBed } from '@angular/core/testing';

import { MprViewreportService } from './mpr-viewreport.service';

describe('MprViewreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MprViewreportService = TestBed.get(MprViewreportService);
    expect(service).toBeTruthy();
  });
});
