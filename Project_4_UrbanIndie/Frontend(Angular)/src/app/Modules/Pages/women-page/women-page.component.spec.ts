import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenPageComponent } from './women-page.component';

describe('WomenPageComponent', () => {
  let component: WomenPageComponent;
  let fixture: ComponentFixture<WomenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WomenPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
