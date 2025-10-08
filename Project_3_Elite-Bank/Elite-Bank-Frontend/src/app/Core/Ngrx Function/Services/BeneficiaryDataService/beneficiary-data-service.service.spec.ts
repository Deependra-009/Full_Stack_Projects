import { TestBed } from '@angular/core/testing';

import { BeneficiaryDataServiceService } from './beneficiary-data-service.service';

describe('BeneficiaryDataServiceService', () => {
  let service: BeneficiaryDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaryDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
