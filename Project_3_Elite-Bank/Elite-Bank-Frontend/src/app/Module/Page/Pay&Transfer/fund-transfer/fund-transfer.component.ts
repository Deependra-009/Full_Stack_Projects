import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BeneficiaryDataServiceService } from 'src/app/Core/Ngrx Function/Services/BeneficiaryDataService/beneficiary-data-service.service';
import { DataTransferService } from 'src/app/Core/Ngrx Function/Services/DataTransfer/data-transfer.service';
import { UserDataServiceService } from 'src/app/Core/Ngrx Function/Services/UserDataService/user-data-service.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.css']
})
export class FundTransferComponent implements OnInit {

  tab=1;
  
  AccountBalance: String = "";
  BeneficiaryData: any = [];
  DiffentBeneficiaryData: any = [];
  AccountNumber="";
  SelectAccount: any = {};
  // SelectAccount: any = {
  //   "beneficiaryId": 1,
  //   "user_id": "404839db-b8d6-4299-9074-92932c38b75d",
  //   "short_name": "naman",
  //   "ifsc_code": null,
  //   "bank_name": null,
  //   "account_number": "725843862359",
  //   "same_bank": true,
  //   "active": true
  // };



  
  private user_id: String = "";

  

  constructor(
    private userService: UserDataServiceService,
    private beneficiaryservice: BeneficiaryDataServiceService,
    private toastr: ToastrService,
    private router:Router,
    private datatransfer:DataTransferService
  ) { }

  ngOnInit(): void {
  

    this.beneficiaryservice.getBeneficiaryObservable()[0].subscribe(
      (data: any) => {
        this.BeneficiaryData = data.filter(
          (item: any) => item.same_bank == true
        );
        this.DiffentBeneficiaryData = data.filter(
          (item: any) => item.same_bank == false
        )

      },
      (error) => {
        console.log(error);

      }
    );

    // -------- Get Account Number --------
    
    this.AccountNumber = this.userService.getAccountNo();
    this.userService.AccountNo.subscribe(
      (data: String) => {
        this.AccountNumber = String(data);
      },
      (error) => {
        console.log(error);

      }
    );

    


  }

  // --------Change Tab ---------

  changeTab(tab: number) {
    this.tab = tab;
  }

  // --------Create Fund Transfer Data Form ---------
  transferFund() {

    if (Object.keys(this.SelectAccount).length == 0) {
      this.toastr.error('', 'Please select account first !!!', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      })
      return;
    }

    this.datatransfer.setAccount(this.SelectAccount)
    this.router.navigateByUrl(`/user/payment-page/${(this.tab == 1) ? "same_account" : "diff_account"}`)
    

   
  }
  



  hasProperties(): boolean {
    return Object.keys(this.SelectAccount).length > 0;
  }








}
