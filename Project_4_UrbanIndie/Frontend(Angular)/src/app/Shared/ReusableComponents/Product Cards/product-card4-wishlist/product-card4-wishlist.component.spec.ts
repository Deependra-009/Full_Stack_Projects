import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard4WishlistComponent } from './product-card4-wishlist.component';

describe('ProductCard4WishlistComponent', () => {
  let component: ProductCard4WishlistComponent;
  let fixture: ComponentFixture<ProductCard4WishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCard4WishlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCard4WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
