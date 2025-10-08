import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tab=1;
  
  ngOnInit(): void {
      
  }

  changeTab(tab: number) {
    this.tab = tab;
  }

}
