import { TestBed } from '@angular/core/testing';

import { FilterAPIGatewayService } from './filter-apigateway.service';

describe('FilterAPIGatewayService', () => {
  let service: FilterAPIGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterAPIGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
