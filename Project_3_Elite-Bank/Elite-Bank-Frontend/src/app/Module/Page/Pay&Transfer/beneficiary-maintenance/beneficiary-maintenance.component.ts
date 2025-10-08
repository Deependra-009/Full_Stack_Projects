import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BeneficiaryControllerService } from 'src/app/Core/Controller/Beneficiary/beneficiary-controller.service';
import { UserEntity } from 'src/app/Core/Model/UserEntity';
import { BeneficiaryDataServiceService } from 'src/app/Core/Ngrx Function/Services/BeneficiaryDataService/beneficiary-data-service.service';
import { UserDataServiceService } from 'src/app/Core/Ngrx Function/Services/UserDataService/user-data-service.service';

@Component({
  selector: 'app-beneficiary-maintenance',
  templateUrl: './beneficiary-maintenance.component.html',
  styleUrls: ['./beneficiary-maintenance.component.css']
})
export class BeneficiaryMaintenanceComponent {
  tab = 1;
  BeneficiaryData!: FormGroup
  user_id:String="";
  CheckCondition = {
    accountNo: false,
    caccountNo: false,
    name: false,
    ifsc_code: false,
    bank_name: false,
    match:false
  }

  constructor(
    private beneficiaryController: BeneficiaryControllerService,
    private userService:UserDataServiceService,
    private beneficiaryservice:BeneficiaryDataServiceService
  ) { }

  ngOnInit(): void {

    // ------- Get User Id --------

    this.user_id=this.userService.getUserId();
    this.userService.UserId.subscribe(
      (data: String) => {
        this.user_id = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.BeneficiaryData = new FormGroup({
      'account_number': new FormControl('', Validators.required),
      'caccount_number': new FormControl('', Validators.required),
      'ifsc_code': new FormControl('', Validators.required),
      'bank_name': new FormControl('', Validators.required),
      'short_name': new FormControl('', Validators.required)
    });
  }

  changeTab(tab: number) {
    this.tab = tab;
    this.CheckCondition.accountNo=false;
    this.CheckCondition.caccountNo=false;
    this.CheckCondition.ifsc_code=false;
    this.CheckCondition.name=false;
    this.CheckCondition.bank_name=false;
    this.CheckCondition.match=false;
  }

  addBeneficiaryButton() {

    if (this.BeneficiaryData.value.account_number.length == 0) {
      this.CheckCondition.accountNo = true;
      return;
    }
    if (this.BeneficiaryData.value.caccount_number.length == 0) {
      this.CheckCondition.caccountNo = true;
      return;
    }
    if (this.BeneficiaryData.value.short_name.length == 0) {
      this.CheckCondition.name = true;
      return;
    }
    // console.log(this.BeneficiaryData.value);





    if (this.BeneficiaryData.value.account_number == this.BeneficiaryData.value.caccount_number) {
      if (this.tab == 1) {
        const data = {
          short_name: this.BeneficiaryData.value.short_name,
          account_number: this.BeneficiaryData.value.account_number,
          same_bank: true,
          active: true,
          user_id: this.user_id
        }


        this.beneficiaryservice.addBeneficiaryData(data);
      }
      else {
        if (this.BeneficiaryData.value.ifsc_code.length == 0) {
          this.CheckCondition.ifsc_code = true;
          return;
        }
        if (this.BeneficiaryData.value.bank_name.length == 0) {
          this.CheckCondition.bank_name = true;
          return;
        }
        const data = {
          short_name: this.BeneficiaryData.value.short_name,
          account_number: this.BeneficiaryData.value.account_number,
          same_bank: false,
          ifsc_code: this.BeneficiaryData.value.ifsc_code,
          bank_name:this.BeneficiaryData.value.bank_name,
          active: true,

          user_id: this.user_id
        }

        this.beneficiaryservice.addBeneficiaryData(data);
      }
    }
    else{
      this.CheckCondition.match=true;
      return;
    }



  }

  CheckConditionFunc(event: any) {
    if (this.CheckCondition.accountNo == true) {
      this.CheckCondition.accountNo = false;
    }
    else if (this.CheckCondition.caccountNo == true) {
      this.CheckCondition.caccountNo = false;
    }
    else if (this.CheckCondition.ifsc_code == true) {
      this.CheckCondition.ifsc_code = false;
    }
    else if (this.CheckCondition.bank_name == true) {
      this.CheckCondition.bank_name = false;
    }
    else if (this.CheckCondition.name == true) {
      this.CheckCondition.name = false;
    }

  }

}
