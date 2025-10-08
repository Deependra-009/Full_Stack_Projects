import { TestBed } from '@angular/core/testing';

import { UserAPIGatewayService } from './user-apigateway.service';

describe('UserAPIGatewayService', () => {
  let service: UserAPIGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAPIGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
