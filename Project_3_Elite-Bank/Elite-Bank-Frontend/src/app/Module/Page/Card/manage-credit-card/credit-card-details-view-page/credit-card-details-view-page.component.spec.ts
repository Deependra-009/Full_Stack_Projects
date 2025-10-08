import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardDetailsViewPageComponent } from './credit-card-details-view-page.component';

describe('CreditCardDetailsViewPageComponent', () => {
  let component: CreditCardDetailsViewPageComponent;
  let fixture: ComponentFixture<CreditCardDetailsViewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditCardDetailsViewPageComponent]
    });
    fixture = TestBed.createComponent(CreditCardDetailsViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
