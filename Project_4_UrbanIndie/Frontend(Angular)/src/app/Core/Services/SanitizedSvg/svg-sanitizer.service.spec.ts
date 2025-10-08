import { TestBed } from '@angular/core/testing';

import { SvgSanitizerService } from './svg-sanitizer.service';

describe('SvgSanitizerService', () => {
  let service: SvgSanitizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgSanitizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
