import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitCardDetailsViewPageComponent } from './debit-card-details-view-page.component';

describe('DebitCardDetailsViewPageComponent', () => {
  let component: DebitCardDetailsViewPageComponent;
  let fixture: ComponentFixture<DebitCardDetailsViewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitCardDetailsViewPageComponent]
    });
    fixture = TestBed.createComponent(DebitCardDetailsViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
