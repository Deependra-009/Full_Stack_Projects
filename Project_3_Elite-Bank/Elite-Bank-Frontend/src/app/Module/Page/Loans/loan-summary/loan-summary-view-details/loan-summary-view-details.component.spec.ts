import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSummaryViewDetailsComponent } from './loan-summary-view-details.component';

describe('LoanSummaryViewDetailsComponent', () => {
  let component: LoanSummaryViewDetailsComponent;
  let fixture: ComponentFixture<LoanSummaryViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanSummaryViewDetailsComponent]
    });
    fixture = TestBed.createComponent(LoanSummaryViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
