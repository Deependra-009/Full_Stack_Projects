import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListMenuComponent } from './chat-list-menu.component';

describe('ChatListMenuComponent', () => {
  let component: ChatListMenuComponent;
  let fixture: ComponentFixture<ChatListMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatListMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
