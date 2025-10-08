import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountBreakupComponent } from './amount-breakup.component';

describe('AmountBreakupComponent', () => {
  let component: AmountBreakupComponent;
  let fixture: ComponentFixture<AmountBreakupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountBreakupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountBreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
