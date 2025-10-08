import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusComponentComponent } from './order-status-component.component';

describe('OrderStatusComponentComponent', () => {
  let component: OrderStatusComponentComponent;
  let fixture: ComponentFixture<OrderStatusComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderStatusComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderStatusComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
