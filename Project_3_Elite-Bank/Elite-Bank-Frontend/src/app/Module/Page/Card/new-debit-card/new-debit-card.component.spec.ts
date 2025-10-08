import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDebitCardComponent } from './new-debit-card.component';

describe('NewDebitCardComponent', () => {
  let component: NewDebitCardComponent;
  let fixture: ComponentFixture<NewDebitCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDebitCardComponent]
    });
    fixture = TestBed.createComponent(NewDebitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
