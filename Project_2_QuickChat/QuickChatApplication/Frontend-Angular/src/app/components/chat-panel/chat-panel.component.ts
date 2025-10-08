import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ContactInfoTransferServiceService } from '../../core/sharedServices/contact-info-transfer-service.service';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat-panel',
  standalone: true,
  imports: [NgClass,FormsModule],
  templateUrl: './chat-panel.component.html',
    // templateUrl: './jbef.html',

  styleUrl: './chat-panel.component.css'
})
export class ChatPanelComponent {
  selectedUserData: any;
  messageText: string = '';
  constructor(private chatDataService: ContactInfoTransferServiceService) {}

  ngOnInit(): void {
    this.initializeChatPanel();
  }

  // Implement logic to update name and number in the chat panel based on the selected user data
  private initializeChatPanel(): void {
    this.chatDataService.selectedUserData$.subscribe((data) => {
      this.selectedUserData = data;
    });
  }


  sendMessage() {
    if (this.messageText.trim() !== '') {
      console.log('Sending message to the backend:', this.messageText);

      const messageObject = {
        id: 4,
        content: this.messageText,
        time: this.getCurrentTime(),
        type: 'sent',
        isSent: true,
        isReceived: false,
        isSeen: false,
      };


      this.messages.push(messageObject);
      this.messageText = '';
    }
  }
  getCurrentTime(): string {
    const currentDate = new Date();

    // Get hours, minutes, and seconds
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    // const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    // Format the time as HH:mm
    const currentTime = `${hours}:${minutes}`;

    return currentTime;
  }
  messages = [
    { id:1, content: 'Hello!', time: '10:00 AM', type: 'sent',isSent: true, isReceived:false,isSeen:false},
    { id:2, content: 'Hi there!', time: '10:05 AM', type: 'received', isSent: false, isReceived:false,isSeen:false},
    { id:3, content: 'iuyb', time: '10:08 AM', type: 'sent', isSent: false, isReceived:false,isSeen:false},

  ];
}
