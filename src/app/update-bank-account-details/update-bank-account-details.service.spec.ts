import { TestBed } from '@angular/core/testing';

import { UpdateBankAccountDetailsService } from './update-bank-account-details.service';

describe('UpdateBankAccountDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateBankAccountDetailsService = TestBed.get(UpdateBankAccountDetailsService);
    expect(service).toBeTruthy();
  });
});
