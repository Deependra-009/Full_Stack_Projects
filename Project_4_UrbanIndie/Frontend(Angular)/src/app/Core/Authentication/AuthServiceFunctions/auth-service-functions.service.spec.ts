import { TestBed } from '@angular/core/testing';

import { AuthServiceFunctionsService } from './auth-service-functions.service';

describe('AuthServiceFunctionsService', () => {
  let service: AuthServiceFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
