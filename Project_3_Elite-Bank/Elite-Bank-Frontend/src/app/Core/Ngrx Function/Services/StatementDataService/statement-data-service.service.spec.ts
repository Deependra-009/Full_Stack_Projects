import { TestBed } from '@angular/core/testing';

import { SatementDataServiceService } from './statement-data-service.service';

describe('SatementDataServiceService', () => {
  let service: SatementDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SatementDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
