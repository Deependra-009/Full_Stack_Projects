import { Component } from '@angular/core';
import { SettingsMenuComponent } from '../../components/settings-menu/settings-menu.component';
import { ChatListMenuComponent } from '../../components/chat-list-menu/chat-list-menu.component';
import { ChatPanelComponent } from '../../components/chat-panel/chat-panel.component';

@Component({
  selector: 'app-chat-shared-layout',
  standalone: true,
  imports: [SettingsMenuComponent,
    ChatListMenuComponent,
    ChatPanelComponent],
  templateUrl: './chat-shared-layout.component.html',
  styleUrl: './chat-shared-layout.component.css'
})
export class ChatSharedLayoutComponent {

}
