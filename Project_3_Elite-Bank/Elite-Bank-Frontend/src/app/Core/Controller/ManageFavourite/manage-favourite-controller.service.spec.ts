import { TestBed } from '@angular/core/testing';
import { ManageFavouriteControllerService } from './manage-favourite-controller.service';


describe('ManageFavouriteService', () => {
  let service: ManageFavouriteControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageFavouriteControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
