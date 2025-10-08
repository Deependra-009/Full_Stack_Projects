import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ControllerService } from 'src/app/Core/Controller/User/controller.service';
import { UserEntity } from 'src/app/Core/Model/UserEntity';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterStep=1;
  RegisterFormCheck={
    form1:false,
    form2:false,
    form3:false
  }

  UserRegisterationData1!:FormGroup
  UserRegisterationData2!:FormGroup
  UserRegisterationData3!:FormGroup

  constructor(
    private userController:ControllerService,
    private route:Router
  ){}

  ngOnInit(): void {

    this.UserRegisterationData1=new FormGroup({
      'account_holder_email': new FormControl('', [Validators.required]),
      'user_password': new FormControl('', [Validators.required]),
      'user_password_rewrite': new FormControl('', [Validators.required]),
    });

    this.UserRegisterationData2=new FormGroup({
      'account_holder_first_name': new FormControl('', [Validators.required]),
      'account_holder_last_name': new FormControl('', [Validators.required]),
      'account_holder_gender': new FormControl('', [Validators.required]),
      'account_holder_phone_no': new FormControl('', [Validators.required]),
      'account_holder_dob': new FormControl('', [Validators.required]),
      'account_holder_religion': new FormControl('', [Validators.required]),
      'account_holder_category': new FormControl('', [Validators.required]),
      'account_holder_occupation': new FormControl('', [Validators.required]),
      'account_holder_gross_income': new FormControl('', [Validators.required]),
      'account_holder_residency_status': new FormControl('', [Validators.required]),
    });

    this.UserRegisterationData3=new FormGroup({
      'account_holder_address': new FormControl('', [Validators.required]),
      'account_holder_city': new FormControl('', [Validators.required]),
      'account_holder_state': new FormControl('', [Validators.required]),
      'account_holder_country': new FormControl('', [Validators.required]),
      'account_holder_pincode': new FormControl('', [Validators.required]),
      'account_holder_marital_status': new FormControl('', [Validators.required]),
      'account_holder_aadhar_no': new FormControl('', [Validators.required]),
      'account_holder_pan_no': new FormControl('', [Validators.required]),
      'deposit_amount': new FormControl('', [Validators.required]),


    });


  }

  goToNextPage(){

    switch(this.RegisterStep){
      case 1:{
        this.RegisterFormCheck.form1=true;
        if(!this.UserRegisterationData1.invalid) this.RegisterStep++;
        break;
      }
      case 2:{
        this.RegisterFormCheck.form2=true;
        if(!this.UserRegisterationData2.invalid) this.RegisterStep++;
        break;
      }
      case 3:{
        this.RegisterFormCheck.form3=true;
        if(!this.UserRegisterationData3.invalid) this.RegisterStep++;
        break;
      }
      case 4:{
        const UserData={
          ...this.UserRegisterationData1.value,
          ...this.UserRegisterationData2.value,
          ...this.UserRegisterationData3.value
        }

        this.userController.addUser(UserData).subscribe(
          (data:any)=>{
            console.log(data);
            localStorage.setItem("ELITE_BANK_USER_ID",data);
            this.route.navigateByUrl('/login')

          },
          (err)=>{
            console.log(err);

          }
        );

        break;
      }

    }
  }

  goToPrevPage(){
    this.RegisterStep--;
  }

}
