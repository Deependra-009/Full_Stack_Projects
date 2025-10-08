import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UserEntity } from './Core/Model/UserEntity';
import { UserDataServiceService } from './Core/Ngrx Function/Services/UserDataService/user-data-service.service';
import { Subscription } from 'rxjs';
// import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Elite-Bank';

  subscription: Subscription;

  constructor(
    private router: Router,
    private userService: UserDataServiceService
  ) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
  }

  ngOnInit(): void {
    const user_id = localStorage.getItem('ELITE_BANK_USER_ID');
    if (user_id != null) {
      this.userService.getUserData(true, user_id);
      setTimeout(() => {
        const data$ = this.userService.getUserObservable()[0];
        data$.subscribe(
          (data: UserEntity) => {
            // console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );
      }, 2000);
    }
  }
}
