import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceFunctionsService } from '../AuthServiceFunctions/auth-service-functions.service';
import { AuthController } from '../../Constant_Data/URL';
import { ToastrService } from 'ngx-toastr';
import { DataTransferServiceService } from '../../Services/DataTransfer/data-transfer-service.service';
import { environment } from './environment';




@Injectable({
  providedIn: 'root'
})
export class GoogleSignInService {

  GoogleClientId = "";
  GoogleSecretId = "";
  GoogleRefreshToken = "";

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthServiceFunctionsService,
    private toastr: ToastrService,
    private datatransfer: DataTransferServiceService
  ) {

    this.GoogleClientId = environment.CLIENT_ID;
    this.GoogleRefreshToken = environment.REFRESH_TOKEN;
    this.GoogleSecretId = environment.SECRECT_ID;

  }




  googleSignIn() {

    try {
      (window as any).onGoogleLibraryLoad = () => {
        this.showPrompt();


      };
      this.showPrompt();
    }
    catch (e) {
      console.log(e);

    }
  }

  showPrompt() {

    try {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: this.GoogleClientId,
        callback: this.handleCredentialResponse.bind(this),
        cancel_on_tap_outside: true
      }); 5
      // @ts-ignore
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // try next provider if OneTap is not displayed or skipped
          // console.log("skipped");
        }
        if (notification.getDismissedReason() === 'credential_returned') {
          // this.handleCredentialResponse.bind(this)
          // console.log('Welcome back!');
        }
      });
    }
    catch (error) {
      console.log(error);

    }
  }


  handleCredentialResponse(response: any) {
    setTimeout(() => {
      AuthServiceFunctionsService.ClickToLogin.next(true);
    }, 1000)
    const idToken = response.credential;

    this.http.post(`${AuthController}/login`, {
      token: idToken,
      clientId: this.GoogleClientId
    })
    .subscribe(
      (data: any) => {
        AuthServiceFunctionsService.isLogin.next(true);
        AuthServiceFunctionsService.ClickToLogin.next(false);


        this.authService.saveUserId(data.user_id);

        AuthServiceFunctionsService.login_path.subscribe((path: any) => {
          window.location.href = path;
        })

        this.authService.saveToken(idToken);
        const exp = this.authService.decodeToken(idToken).exp;
        const refreshTime = exp - (5 * 60);

        setTimeout(() => {
        }, refreshTime);
      },
      (error) => {
        console.log(error);

        setTimeout(() => {
          this.toastr.error('Something is wrong !!!', '', {
            positionClass: 'toast-top-center',
            progressBar: true,
            timeOut: 3000
          });
          AuthServiceFunctionsService.ClickToLogin.next(false);
        }, 3000)

      }
    );



  }



  googleSignOut() {
    window.location.href = "/";
    AuthServiceFunctionsService.isLogin.next(false);
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: this.GoogleClientId,
    });
    // @ts-ignore
    google.accounts.id.disableAutoSelect();
    this.authService.removeTokenFromCookie();


    // @ts-ignore
    // google.accounts.id.initialize({
    //   client_id: CLIENT_ID,
    //   callback: this.handleCredentialResponse.bind(this),
    //   cancel_on_tap_outside: true
    // });
    // // @ts-ignore
    // google.accounts.id.prompt((notification) => {
    //   if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
    //     // try next provider if OneTap is not displayed or skipped
    //     console.log("skipped");
    //   }
    //   if (notification.getDismissedReason() === 'credential_returned') {
    //     // this.handleCredentialResponse.bind(this)
    //     console.log('Welcome back!');
    //   }
    // })


  }



  refreshToken() {
    const refreshToken = this.GoogleClientId;
    const clientId = this.GoogleClientId;
    const clientSecret = this.GoogleSecretId
    const params = new HttpParams()
      .set('refresh_token', this.GoogleRefreshToken)
      .set('client_id', clientId)
      .set('client_secret', clientSecret)
      .set('grant_type', 'refresh_token');

    this.http.post('https://www.googleapis.com/oauth2/v4/token', params)
      .subscribe(
        (response: any) => {
          // console.log(response);
        },
        (error: any) => {
          console.error('Token Refresh Error:', error);
        }
      );
  }

}
