import { TestBed } from '@angular/core/testing';

import { ContactInfoTransferServiceService } from './contact-info-transfer-service.service';

describe('ContactInfoTransferServiceService', () => {
  let service: ContactInfoTransferServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactInfoTransferServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
