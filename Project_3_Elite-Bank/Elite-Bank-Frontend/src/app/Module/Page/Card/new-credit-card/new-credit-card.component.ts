import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import { BasicInformationData } from 'src/app/Core/Constant/CardDetails';
import { CreditCardControllerService } from 'src/app/Core/Controller/CreditCard/credit-card-controller.service';
import { LoginDetailsService } from 'src/app/Core/Ngrx Function/Services/LoginDetailsService/login-details.service';
import { NomineeInformationData } from '../../../../Core/Constant/CardDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-credit-card',
  templateUrl: './new-credit-card.component.html',
  styleUrls: ['./new-credit-card.component.css']
})
export class NewCreditCardComponent {

  @ViewChild('nominee_dob') nominee_dob!: MatDatepicker<Date>;


  CheckForm = {
    form1: false,
    form2: false
  }


  constructor(
    private creditcard: CreditCardControllerService,
    private dateType: DatePipe,
    private toastr: ToastrService,
    private router:Router
  ) { }

  isCreditCardProcessComplete = 1



  tabs = 1;
  BasicInformationForm!: FormGroup
  NomineeInformationForm!: FormGroup


  ngOnInit(): void {
    const date = new Date()
    // console.log(this.dateType.transform(new Date(),"dd/MM/YYYY"));

    this.BasicInformationForm = new FormGroup({
      'marital_details': new FormControl('', [Validators.required]),
      'religion': new FormControl('', [Validators.required]),
      'category': new FormControl('', [Validators.required]),
      'occupation': new FormControl('', [Validators.required]),
      'qualification': new FormControl('', [Validators.required]),
      'house_ownership': new FormControl('', [Validators.required]),
      'residency_status': new FormControl('', [Validators.required]),
      'staff_of_bank': new FormControl('', [Validators.required]),
      'gross_annual_income': new FormControl('', [Validators.required]),
      'card_name': new FormControl('', [Validators.required]),
      'card_type': new FormControl('', [Validators.required])

    });

    this.NomineeInformationForm = new FormGroup({
      'nominee_relationship': new FormControl('', [Validators.required]),
      'nominee_name': new FormControl('', [Validators.required]),
      'nominee_dob': new FormControl('', [Validators.required]),
      'nominee_phone_number': new FormControl('', [Validators.required, Validators.maxLength(10)]),
      'nominee_address': new FormControl('', [Validators.required]),
      'nominee_address_type': new FormControl('', [Validators.required])
    })
  }

  openDatePicker() {
    this.nominee_dob.open();


  }

  onNext() {
    if (this.tabs == 1 && this.BasicInformationForm.status == 'INVALID') {

      this.toastr.error('The required field is missing.', 'Error', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      this.CheckForm.form1 = true;
      return;

    }
    else if (this.tabs == 1) {
      this.tabs++
      console.log(this.BasicInformationForm);
      return;
    }

    if (this.tabs == 2 && this.NomineeInformationForm.status == 'INVALID') {

      this.toastr.error('The required field is missing.', 'Error', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      this.CheckForm.form2 = true;
      return;

    }
    if (this.tabs == 2 && this.NomineeInformationForm.value.nominee_phone_number.length != 10) {

      this.toastr.error('Phone Number is Invalid', 'Error', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      this.CheckForm.form2 = true;
      return;

    }
    else if (this.tabs == 2) {
      this.tabs++;
      console.log(this.NomineeInformationForm);
    }




    if (this.tabs == 3) {
      const UserInformationData = {
        ...this.BasicInformationForm.value,
        ...this.NomineeInformationForm.value,
        user_id: LoginDetailsService.UserId,
        date_of_issued: this.dateType.transform(new Date(), "dd/MM/YYYY"),
        active: true
      }
      this.creditcard.addCreditCard(UserInformationData).subscribe(
        (data: any) => {
          console.log(data);
          setTimeout(() => {
            this.isCreditCardProcessComplete = 3;
            this.tabs++;
            this.toastr.success('', 'Your Application is Submitted !!!', {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'decreasing',
            })

          }, 2000)

        },
        (error) => {
          console.log(error);
          this.isCreditCardProcessComplete = 2;
          this.toastr.error('', 'Application Submission Failed !!!', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
          })

        }
      );
    }
    

  }
  gotoHome(){
    this.router.navigate(['/user/manage-debit-card'])
  }

  onPrevious() {
    this.tabs--;
    console.log(this.tabs);
  }

  BasicInformation = BasicInformationData

  NomineeInformation = NomineeInformationData

}
