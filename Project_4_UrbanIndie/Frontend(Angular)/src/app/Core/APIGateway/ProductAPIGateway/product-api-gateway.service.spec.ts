import { TestBed } from '@angular/core/testing';

import { ProductApiGatewayService } from './product-api-gateway.service';

describe('ProductApiGatewayService', () => {
  let service: ProductApiGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductApiGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
