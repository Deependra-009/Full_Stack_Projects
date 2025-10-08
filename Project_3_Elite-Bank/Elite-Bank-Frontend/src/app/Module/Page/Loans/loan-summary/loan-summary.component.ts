import { Component, OnInit } from '@angular/core';
import { PageData } from '../../../../Core/Constant/PageData';
import { Router } from '@angular/router';
import { LoanAccountService } from 'src/app/Core/Controller/LoanAccount/loan-account.service';
import { UserDataServiceService } from 'src/app/Core/Ngrx Function/Services/UserDataService/user-data-service.service';
import { LoginDetailsService } from 'src/app/Core/Ngrx Function/Services/LoginDetailsService/login-details.service';
import { DataTransferService } from '../../../../Core/Ngrx Function/Services/DataTransfer/data-transfer.service';

@Component({
  selector: 'app-loan-summary',
  templateUrl: './loan-summary.component.html',
  styleUrls: ['./loan-summary.component.css']
})
export class LoanSummaryComponent implements OnInit {

  PageData=PageData;
  AccountNumber:any="";
  AllLoanData:any=[]

  constructor(
    private router:Router,
    private loanService:LoanAccountService,
    private userService:UserDataServiceService,
    private dataTransfer:DataTransferService
  ){}

  ngOnInit(): void {

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

    this.loanService.getAllLoanParticularUser(LoginDetailsService.UserId,LoginDetailsService.AccountNumber).subscribe(
      (data:any)=>{
        console.log(data);
        this.AllLoanData=data;

      }
    );


  }

  goToLoanSummaryDetailPage(data:any){

    this.dataTransfer.setLoanData(data);

    this.router.navigateByUrl("/user/loan-details-page");
  }





}
