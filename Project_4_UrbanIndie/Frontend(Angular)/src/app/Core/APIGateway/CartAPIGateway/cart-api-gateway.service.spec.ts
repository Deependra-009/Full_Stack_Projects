import { TestBed } from '@angular/core/testing';

import { CartApiGatewayService } from './cart-api-gateway.service';

describe('CartApiGatewayService', () => {
  let service: CartApiGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartApiGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
