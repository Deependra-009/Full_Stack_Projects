import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageListComponent } from './product-page-list.component';

describe('ProductPageListComponent', () => {
  let component: ProductPageListComponent;
  let fixture: ComponentFixture<ProductPageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
