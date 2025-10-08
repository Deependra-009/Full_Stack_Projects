import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenPageComponent } from './men-page.component';

describe('MenPageComponent', () => {
  let component: MenPageComponent;
  let fixture: ComponentFixture<MenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
