import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';
import { ChatListMenuComponent } from './components/chat-list-menu/chat-list-menu.component';
import { ChatPanelComponent } from './components/chat-panel/chat-panel.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SettingsMenuComponent,
    ChatListMenuComponent,
    ChatPanelComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Whatsapp Clone';

  public constructor(
    private route:Router
  ){}

  ngOnInit(): void {


  }




}
