import { TestBed } from '@angular/core/testing';

import { WishlistAPIGatewayService } from './wishlist-apigateway.service';

describe('WishlistAPIGatewayService', () => {
  let service: WishlistAPIGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistAPIGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
