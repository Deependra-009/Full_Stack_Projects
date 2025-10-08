import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAddressPaymentComponent } from './cart-address-payment.component';

describe('CartAddressPaymentComponent', () => {
  let component: CartAddressPaymentComponent;
  let fixture: ComponentFixture<CartAddressPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartAddressPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartAddressPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
