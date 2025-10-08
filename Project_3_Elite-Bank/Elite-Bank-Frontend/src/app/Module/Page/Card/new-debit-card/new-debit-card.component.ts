import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasicInformationData, NomineeInformationData } from 'src/app/Core/Constant/CardDetails';
import { DebitCardControllerService } from 'src/app/Core/Controller/DebitCard/debit-card-controller.service';
import { LoginDetailsService } from 'src/app/Core/Ngrx Function/Services/LoginDetailsService/login-details.service';

@Component({
  selector: 'app-new-debit-card',
  templateUrl: './new-debit-card.component.html',
  styleUrls: ['./new-debit-card.component.css']
})
export class NewDebitCardComponent implements OnInit {

  @ViewChild('nominee_dob') nominee_dob!: MatDatepicker<Date>;

  CheckForm = {
    form1: false,
    form2: false
  }

  isDebitCardProcessComplete = 1;


  constructor(
    private debitcard: DebitCardControllerService,
    private dateType: DatePipe,
    private toastr: ToastrService,
    private router:Router
  ) { }



  tabs = 1;
  BasicInformationForm!: FormGroup
  NomineeInformationForm!: FormGroup



  ngOnInit(): void {
    const date = new Date()
    console.log(this.dateType.transform(new Date(), "dd/MM/YYYY"));

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
    else if(this.tabs==2) {
      this.tabs++;
      const UserInformationData = {
        ...this.BasicInformationForm.value,
        ...this.NomineeInformationForm.value,
        user_id: LoginDetailsService.UserId,
        date_of_issued: this.dateType.transform(new Date(), "dd/MM/YYYY")
      }
      this.debitcard.addDebitCard(UserInformationData).subscribe(
        (data: any) => {
          console.log(data);
          setTimeout(() => {
            this.isDebitCardProcessComplete = 3;
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
          this.isDebitCardProcessComplete = 2;
          this.toastr.error('', 'Application Submission Failed !!!', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
          })

        }
      );
    }




    if (this.tabs == 3) {

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
