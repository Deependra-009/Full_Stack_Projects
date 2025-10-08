import { TestBed } from '@angular/core/testing';

import { ManageFavouriteServiceService } from './manage-favourite-service.service';

describe('ManageFavouriteServiceService', () => {
  let service: ManageFavouriteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageFavouriteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
