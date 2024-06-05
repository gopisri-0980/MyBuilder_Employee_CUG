import { TestBed } from '@angular/core/testing';

import { RequestForInterestWaiverService } from './request-for-interest-waiver.service';

describe('RequestForInterestWaiverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestForInterestWaiverService = TestBed.get(RequestForInterestWaiverService);
    expect(service).toBeTruthy();
  });
});
