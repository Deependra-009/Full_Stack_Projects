import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelCategoryPageComponent } from './apparel-category-page.component';

describe('ApparelCategoryPageComponent', () => {
  let component: ApparelCategoryPageComponent;
  let fixture: ComponentFixture<ApparelCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApparelCategoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApparelCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
