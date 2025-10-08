import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from 'src/app/Core/AuthService/auth-service.service';
import { SideNavData } from 'src/app/Core/Constant/SideNavData';
// import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService:AuthServiceService

  ) { }

    ngOnInit(): void {

    }

  Style: String = "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500";
  ariaSelected = false;
  SideNavData =SideNavData;
  ShowSubNavData:any="";

  showSubNavData(item:any){
    if(item.class==false) return;

    if(item.id==this.ShowSubNavData){
      this.ShowSubNavData="";
      return;
    }
    this.ShowSubNavData=item.id;
  }

  goToPage(active:boolean,link:string){
    if(active==false) return;
    this.router.navigateByUrl(link);
  }



  login() {

  }

  logout(){
    this.authService.removeTokenFromCookie();
    localStorage.removeItem('ELITE_BANK_ACCOUNT_NUMBER');
    localStorage.removeItem('ELITE_BANK_USER_ID')
    window.location.href = "/login";

  }

  signInWithGoogle(): void {


  }





}
