import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard4DepartmentpageComponent } from './product-card4-departmentpage.component';

describe('ProductCard4DepartmentpageComponent', () => {
  let component: ProductCard4DepartmentpageComponent;
  let fixture: ComponentFixture<ProductCard4DepartmentpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCard4DepartmentpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCard4DepartmentpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
