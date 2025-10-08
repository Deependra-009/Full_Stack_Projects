import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenNewTermDepositComponent } from './open-new-term-deposit.component';

describe('OpenNewTermDepositComponent', () => {
  let component: OpenNewTermDepositComponent;
  let fixture: ComponentFixture<OpenNewTermDepositComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenNewTermDepositComponent]
    });
    fixture = TestBed.createComponent(OpenNewTermDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
