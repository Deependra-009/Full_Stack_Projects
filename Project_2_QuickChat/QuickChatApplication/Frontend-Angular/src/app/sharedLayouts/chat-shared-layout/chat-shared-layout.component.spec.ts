import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSharedLayoutComponent } from './chat-shared-layout.component';

describe('ChatSharedLayoutComponent', () => {
  let component: ChatSharedLayoutComponent;
  let fixture: ComponentFixture<ChatSharedLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSharedLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatSharedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
