import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Core/AuthService/auth-service.service';
import { ControllerService } from 'src/app/Core/Controller/User/controller.service';
import { LoginDetailsService } from 'src/app/Core/Ngrx Function/Services/LoginDetailsService/login-details.service';
import { UserDataServiceService } from 'src/app/Core/Ngrx Function/Services/UserDataService/user-data-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  UserLoginData!:FormGroup

  constructor(
    private userController:ControllerService,
    private router:Router,
    private userService:UserDataServiceService,
    private authService:AuthServiceService
  ){}

  ngOnInit(): void {

    this.UserLoginData=new FormGroup({
      'user_customer_id': new FormControl('', [Validators.required]),
      'account_holder_email': new FormControl('naman@gmail.com', [Validators.required]),
      'user_password': new FormControl('12345', [Validators.required]),
    });
  }

  loginMethod(){
    console.log(this.UserLoginData.value);

    this.userController.loginUser(this.UserLoginData.value).subscribe(
      (data:any)=>{
        this.authService.saveToken(data.jwtToken);
        localStorage.setItem("ELITE_BANK_USER_ID",data.user_id);
        this.userService.getUserData(true,data.user_id);

        this.router.navigateByUrl('/user')


      }
    );

  }





}
