import { TestBed } from '@angular/core/testing';

import { StatementControllerService } from './statement-controller.service';

describe('StatementControllerService', () => {
  let service: StatementControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatementControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
