import { TestBed } from '@angular/core/testing';

import { TDSUploadService } from './tdsupload.service';

describe('TDSUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TDSUploadService = TestBed.get(TDSUploadService);
    expect(service).toBeTruthy();
  });
});
