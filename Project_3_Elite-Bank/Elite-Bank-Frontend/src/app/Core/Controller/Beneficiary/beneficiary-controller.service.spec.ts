import { TestBed } from '@angular/core/testing';

import { BeneficiaryControllerService } from './beneficiary-controller.service';

describe('BeneficiaryControllerService', () => {
  let service: BeneficiaryControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaryControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
