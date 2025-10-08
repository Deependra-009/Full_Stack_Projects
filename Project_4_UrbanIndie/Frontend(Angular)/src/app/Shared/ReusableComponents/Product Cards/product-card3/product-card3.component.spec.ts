import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard3Component } from './product-card3.component';

describe('ProductCard3Component', () => {
  let component: ProductCard3Component;
  let fixture: ComponentFixture<ProductCard3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCard3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCard3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
