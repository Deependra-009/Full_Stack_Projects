import { TestBed } from '@angular/core/testing';

import { OrderAPIGatewayService } from './order-apigateway.service';

describe('OrderAPIGatewayService', () => {
  let service: OrderAPIGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAPIGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
