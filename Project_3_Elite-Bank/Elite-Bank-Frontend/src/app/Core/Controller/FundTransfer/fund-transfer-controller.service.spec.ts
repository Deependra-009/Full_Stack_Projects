import { TestBed } from '@angular/core/testing';

import { FundTRansferControllerService } from './fund-transfer-controller.service';

describe('FundTRansferControllerService', () => {
  let service: FundTRansferControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundTRansferControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
