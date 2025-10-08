import { Component } from '@angular/core';
import { ContactInfoTransferServiceService } from '../../core/sharedServices/contact-info-transfer-service.service';

@Component({
  selector: 'app-chat-list-menu',
  standalone: true,
  imports: [],
  templateUrl: './chat-list-menu.component.html',
  styleUrl: './chat-list-menu.component.css'
})
export class ChatListMenuComponent {

  SelectedChat=0;
  constructor(private chatDataService: ContactInfoTransferServiceService) {}


  //setting selected user info at service
  openClickedUser(id:any){
    this.SelectedChat=id;
    const selectedUserData = this.UserList.find((user) => user.id === id);
  this.chatDataService.setSelectedUserData(selectedUserData);
  }



  UserList=[
    {"id": 0, "name": "deepu","number": "+123 456 7890", "time": "07:54 PM"},
    {"id": 1, "name": "John","number": "+123 456 7890", "time": "08:30 AM"},
    {"id": 2, "name": "Alice","number": "+123 456 7890", "time": "12:45 PM"},
    {"id": 3, "name": "Bob","number": "+123 456 7890", "time": "03:15 PM"},
    {"id": 4, "name": "Eva","number": "+123 456 7890", "time": "11:20 AM"},
    {"id": 5, "name": "Michael","number": "+123 456 7890", "time": "06:05 PM"},
    {"id": 6, "name": "Sara","number": "+123 456 7890", "time": "09:10 AM"},
    {"id": 7, "name": "Chris","number": "+123 456 7890", "time": "02:40 PM"},
    {"id": 8, "name": "Emma","number": "+123 456 7890", "time": "04:55 PM"},
    {"id": 9, "name": "Alex","number": "+123 456 7890", "time": "10:30 AM"},
    {"id": 10, "name": "Olivia","number": "+123 456 7890", "time": "01:25 PM"},
    {"id": 11, "name": "Daniel","number": "+123 456 7890", "time": "05:40 PM"},
    {"id": 12, "name": "Sophia","number": "+123 456 7890", "time": "08:15 AM"},
    {"id": 13, "name": "Matthew","number": "+123 456 7890", "time": "03:50 PM"},
    {"id": 14, "name": "Ava","number": "+123 456 7890", "time": "06:30 PM"},
    {"id": 15, "name": "William","number": "+123 456 7890", "time": "09:45 AM"},
    {"id": 16, "name": "Grace","number": "+123 456 7890", "time": "11:55 AM"},
    {"id": 17, "name": "Henry","number": "+123 456 7890", "time": "02:10 PM"},
    {"id": 18, "name": "Lily","number": "+123 456 7890", "time": "04:25 PM"},
    {"id": 19, "name": "James","number": "+123 456 7890", "time": "07:00 PM"},
    {"id": 20, "name": "Sophie","number": "+123 456 7890", "time": "09:15 AM"},
    {"id": 21, "name": "Benjamin","number": "+123 456 7890", "time": "11:30 AM"},
    {"id": 22, "name": "Isabella","number": "+123 456 7890", "time": "02:45 PM"},
    {"id": 23, "name": "Lucas","number": "+123 456 7890", "time": "04:20 PM"},
    {"id": 24, "name": "Chloe","number": "+123 456 7890", "time": "06:35 PM"},
    {"id": 25, "name": "Ethan","number": "+123 456 7890", "time": "08:50 AM"},
    {"id": 26, "name": "Mia","number": "+123 456 7890", "time": "01:05 PM"},
    {"id": 27, "name": "Noah","number": "+123 456 7890", "time": "03:40 PM"},
    {"id": 28, "name": "Aiden","number": "+123 456 7890", "time": "05:55 PM"},
    {"id": 29, "name": "Emma","number": "+123 456 7890", "time": "07:10 PM"}
  ]


}
