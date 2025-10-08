import { Location } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FundTRansferControllerService } from 'src/app/Core/Controller/FundTransfer/fund-transfer-controller.service';
import { BeneficiaryDataServiceService } from 'src/app/Core/Ngrx Function/Services/BeneficiaryDataService/beneficiary-data-service.service';
import { DataTransferService } from 'src/app/Core/Ngrx Function/Services/DataTransfer/data-transfer.service';
import { ManageFavouriteServiceService } from 'src/app/Core/Ngrx Function/Services/ManageFavouriteService/manage-favourite-service.service';
import { StatementDataServiceService } from 'src/app/Core/Ngrx Function/Services/StatementDataService/statement-data-service.service';
import { UserDataServiceService } from 'src/app/Core/Ngrx Function/Services/UserDataService/user-data-service.service';
import Swal from 'sweetalert2';
import { browserRefresh } from '../../../../app.component';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {

  page_type = "";
  payment_tabs = 1;
  payment = false;
  AccountBalance: String = "0";
  SelectAccount: any = {};



  FundTransferDataForm!: FormGroup;
  private user_id: String = "";

  FundTransferData = {
    fromAccountNo: "",
    toAccountNo: "",
    ifsc_code: "",
    status: "",
    amount: "",
    description: "",
    expenseType: "",
  }

  checkCondition = {
    amount: false,
    desc: false,
    type: false
  }

  isPaymentComplete = 1;




  constructor(
    private fundController: FundTRansferControllerService,
    private userService: UserDataServiceService,
    private statementservice: StatementDataServiceService,
    private beneficiaryservice: BeneficiaryDataServiceService,
    private manageservice: ManageFavouriteServiceService,
    private toastr: ToastrService,
    private router: Router,
    private datatransfer: DataTransferService,
    private location: Location
  ) {

  }



  // to prevent reload
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler($event: any) {
    $event.returnValue = false
  }


  ngOnInit(): void {




    // Get the current URL
    const currentUrl = window.location.href;

    const pathSegments = currentUrl.split('/');

    this.page_type = pathSegments[pathSegments.length - 1];

    console.log(this.page_type); // This will print "same_account"




    // ------- Get Account Balance--------
    this.userService.AccountBalance.subscribe((
      (data: String) => {
        this.AccountBalance = data;
      }
    ))


    // ------- Get User Id --------

    this.user_id = this.userService.getUserId();
    this.userService.UserId.subscribe(
      (data: String) => {
        this.user_id = data;
      },
      (error) => {
        console.log(error);
      }
    );

    // -------- Get Account Number --------

    this.FundTransferData.fromAccountNo = this.userService.getAccountNo();
    this.userService.AccountNo.subscribe(
      (data: String) => {
        this.FundTransferData.fromAccountNo = String(data);
      },
      (error) => {
        console.log(error);

      }
    );




    // --------Create Fund Transfer Data Form ---------

    this.FundTransferDataForm = new FormGroup({
      'fromAccountNo': new FormControl({ value: this.FundTransferData.fromAccountNo, disabled: true }, [Validators.required]),
      'toAccountNo': new FormControl({ value: this.FundTransferData.toAccountNo, disabled: true }, [Validators.required]),
      'ifsc_code': new FormControl({ value: this.FundTransferData.ifsc_code, disabled: true }, [Validators.required]),
      'amount': new FormControl(this.FundTransferData.amount, [Validators.required]),
      'description': new FormControl(this.FundTransferData.description, [Validators.required]),
      'expenseType': new FormControl(this.FundTransferData.expenseType, [Validators.required])
    });

    if (this.FundTransferData.toAccountNo == null) {
      this.router.navigateByUrl("/user/fund-transfer-page")
    }


    this.datatransfer.SelectAccount.subscribe(
      (data: any) => {
        this.SelectAccount = data;
        console.log(data);

        if (Object.keys(this.SelectAccount).length == 0) {
          this.router.navigateByUrl("/user/fund-transfer-page");
          return;
        }
        if(this.SelectAccount.hasOwnProperty('amount')){
          this.FundTransferData.amount=this.SelectAccount.amount
          this.FundTransferData.description=this.SelectAccount.description
        }
        this.FundTransferDataForm.setValue({
          'fromAccountNo': this.FundTransferData.fromAccountNo,
          'expenseType': this.FundTransferData.expenseType,
          'toAccountNo': this.SelectAccount.account_number,
          'ifsc_code': this.SelectAccount.ifsc_code,
          'amount': this.FundTransferData.amount,
          'description': this.FundTransferData.description
        })
      }
    )






  }





  // --------Create Fund Transfer Data Form ---------

  closePage() {
    this.router.navigateByUrl("/user/fund-transfer-page")
  }

  check(event: any) {
    if (this.checkCondition.amount == true) {
      this.checkCondition.amount = false;
      this.FundTransferData.amount = event.target.value
    }
    if (this.checkCondition.desc == true) {
      this.checkCondition.desc = false;
      this.FundTransferData.description = event.target.value
    }

  }

  onNext() {


    this.FundTransferData = {
      fromAccountNo: this.FundTransferData.fromAccountNo,
      toAccountNo: this.SelectAccount.account_number,
      ifsc_code: this.SelectAccount.ifsc_code,
      ...this.FundTransferDataForm.value,
      status: this.page_type
    }


    if (this.FundTransferData.amount.length == 0) {
      this.checkCondition.amount = true;
      return;
    }
    if (this.FundTransferData.expenseType == "" || this.FundTransferData.expenseType == null) {
      this.checkCondition.type = true;
      return;
    }
    if (this.FundTransferData.description.length == 0) {
      this.checkCondition.desc = true;
      return;
    }
    if (Number(this.FundTransferData.amount) > Number(this.AccountBalance)) {
      this.toastr.error('', 'Insufficient Balance !!!', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      })
      return;
    }


    // change tab
    this.payment_tabs=3;

    if (this.payment_tabs == 3) {
      this.FundTransferData.description = this.SelectAccount.short_name + '/' + this.FundTransferData.description.substring(0, 15);

      this.fundController.fundTransfer(this.FundTransferData).subscribe(
        (res) => {
          setTimeout(() => {
            this.isPaymentComplete = 3;
            this.toastr.success('', 'Payment Successufull !!!', {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'decreasing',
            })

          },2000)
          window.location.href='/user/fund-transfer-page'
          // this.statementservice.getStatementData(true, this.FundTransferData.fromAccountNo)
        },
        (error) => {
          this.isPaymentComplete = 2;
          this.toastr.error('', 'Payment Failed !!!', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
          })
          this.router.navigateByUrl("/user/fund-transfer-page")

          console.log(error);
        }
      );
    }

  }

  onPrevious() {
    this.payment_tabs--;

  }

  hasProperties(): boolean {
    return Object.keys(this.SelectAccount).length > 0;
  }



  addFundTransferInFavourite() {
    const ManageFavouritePayment = {
      account_number: this.FundTransferData.toAccountNo,
      ifsc_code: this.FundTransferData.ifsc_code,
      description: this.FundTransferData.description.split("/")[1],
      beneficiary_name: this.FundTransferData.description.split("/")[0],
      amount: this.FundTransferData.amount,
      user_id: this.user_id
    }

    this.manageservice.addFavouritePayment(ManageFavouritePayment);

  }





}
