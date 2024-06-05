import { TestBed } from '@angular/core/testing';

import { ModuleAndSiteAccessMastersService } from './module-and-site-access-masters.service';

describe('ModuleAndSiteAccessMastersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuleAndSiteAccessMastersService = TestBed.get(ModuleAndSiteAccessMastersService);
    expect(service).toBeTruthy();
  });
});
