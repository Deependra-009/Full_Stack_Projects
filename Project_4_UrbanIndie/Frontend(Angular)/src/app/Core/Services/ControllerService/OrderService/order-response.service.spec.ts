import { TestBed } from '@angular/core/testing';

import { OrderResponseService } from './order-response.service';

describe('OrderResponseService', () => {
  let service: OrderResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
