import { TestBed } from '@angular/core/testing';

import { CreditCardControllerService } from './credit-card-controller.service';

describe('CreditCardControllerService', () => {
  let service: CreditCardControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
