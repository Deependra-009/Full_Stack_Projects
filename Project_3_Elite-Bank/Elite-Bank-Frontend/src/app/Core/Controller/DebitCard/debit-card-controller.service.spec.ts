import { TestBed } from '@angular/core/testing';

import { DebitCardControllerService } from './debit-card-controller.service';

describe('DebitCardControllerService', () => {
  let service: DebitCardControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebitCardControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
