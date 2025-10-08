import { TestBed } from '@angular/core/testing';

import { AddressAPIGatewayService } from './address-apigateway.service';

describe('AddressAPIGatewayService', () => {
  let service: AddressAPIGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressAPIGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
