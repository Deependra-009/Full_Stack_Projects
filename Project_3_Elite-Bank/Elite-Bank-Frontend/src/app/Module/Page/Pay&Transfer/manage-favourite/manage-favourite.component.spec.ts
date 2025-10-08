import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFavouriteComponent } from './manage-favourite.component';

describe('ManageFavouriteComponent', () => {
  let component: ManageFavouriteComponent;
  let fixture: ComponentFixture<ManageFavouriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageFavouriteComponent]
    });
    fixture = TestBed.createComponent(ManageFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
