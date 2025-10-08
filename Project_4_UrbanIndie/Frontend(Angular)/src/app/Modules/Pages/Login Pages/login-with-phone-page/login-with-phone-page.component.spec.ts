import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithPhonePageComponent } from './login-with-phone-page.component';

describe('LoginWithPhonePageComponent', () => {
  let component: LoginWithPhonePageComponent;
  let fixture: ComponentFixture<LoginWithPhonePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWithPhonePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWithPhonePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
