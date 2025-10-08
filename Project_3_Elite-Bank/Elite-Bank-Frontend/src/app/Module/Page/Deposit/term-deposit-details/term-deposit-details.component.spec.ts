import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermDepositDetailsComponent } from './term-deposit-details.component';

describe('TermDepositDetailsComponent', () => {
  let component: TermDepositDetailsComponent;
  let fixture: ComponentFixture<TermDepositDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermDepositDetailsComponent]
    });
    fixture = TestBed.createComponent(TermDepositDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
