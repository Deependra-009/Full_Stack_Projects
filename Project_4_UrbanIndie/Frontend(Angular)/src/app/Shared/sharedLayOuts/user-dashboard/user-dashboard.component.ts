import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleSignInService } from 'src/app/Core/Authentication/GoogleSignIn/google-sign-in.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  CurrentPage=""


  ngOnInit(): void {
    
  }

  constructor(
    private router:Router,
    private googlesignin:GoogleSignInService
  ){
    this.router.events.subscribe(
      (event)=>{
        if(event instanceof NavigationEnd){
          this.CurrentPage=event.url;
        }
        
      
      }
    )
  }

  signout(){
    this.googlesignin.googleSignOut();
  
  }
}
