import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryMaintenanceComponent } from './beneficiary-maintenance.component';

describe('BeneficiaryMaintenanceComponent', () => {
  let component: BeneficiaryMaintenanceComponent;
  let fixture: ComponentFixture<BeneficiaryMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficiaryMaintenanceComponent]
    });
    fixture = TestBed.createComponent(BeneficiaryMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
