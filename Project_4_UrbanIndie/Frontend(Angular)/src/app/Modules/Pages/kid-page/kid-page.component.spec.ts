import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidPageComponent } from './kid-page.component';

describe('KidPageComponent', () => {
  let component: KidPageComponent;
  let fixture: ComponentFixture<KidPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KidPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
