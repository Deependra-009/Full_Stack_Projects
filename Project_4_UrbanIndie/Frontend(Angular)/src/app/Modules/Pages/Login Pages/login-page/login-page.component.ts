import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GoogleSignInService } from 'src/app/Core/Authentication/GoogleSignIn/google-sign-in.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private googlesignin:GoogleSignInService
  ){}

  UserData={
    'email':'deependra@gmail.com',
    'password':'123'

  }

  login(){
    document.cookie = `g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    this.googlesignin.googleSignIn();
  }

  LoginData!:FormGroup

  ngOnInit():void{
    this.LoginData = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }

  submitFunction(){
    if(this.UserData.email==this.LoginData.value.email && this.UserData.password==this.LoginData.value.password){
      alert("Login Credentials correct")
    }
    else{
      alert("Login Credentials incorrect")
    }
  }

}
