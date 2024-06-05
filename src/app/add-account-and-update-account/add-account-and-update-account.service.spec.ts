import { TestBed } from '@angular/core/testing';

import { AddAccountAndUpdateAccountService } from './add-account-and-update-account.service';

describe('AddAccountAndUpdateAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddAccountAndUpdateAccountService = TestBed.get(AddAccountAndUpdateAccountService);
    expect(service).toBeTruthy();
  });
});
