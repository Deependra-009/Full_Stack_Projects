import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpWithPhonePageComponent } from './sign-up-with-phone-page.component';

describe('SignUpWithPhonePageComponent', () => {
  let component: SignUpWithPhonePageComponent;
  let fixture: ComponentFixture<SignUpWithPhonePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpWithPhonePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpWithPhonePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
