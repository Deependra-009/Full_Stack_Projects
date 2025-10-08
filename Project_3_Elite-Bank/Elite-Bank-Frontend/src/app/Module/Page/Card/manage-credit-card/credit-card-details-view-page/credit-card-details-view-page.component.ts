import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCardSideNavData } from 'src/app/Core/Constant/CardSideNavData';
import { PageData } from 'src/app/Core/Constant/PageData';
import { CreditCardControllerService } from 'src/app/Core/Controller/CreditCard/credit-card-controller.service';
import { LoanAccountService } from 'src/app/Core/Controller/LoanAccount/loan-account.service';
import { DataTransferService } from 'src/app/Core/Ngrx Function/Services/DataTransfer/data-transfer.service';
import { LoginDetailsService } from 'src/app/Core/Ngrx Function/Services/LoginDetailsService/login-details.service';
import { UserDataServiceService } from 'src/app/Core/Ngrx Function/Services/UserDataService/user-data-service.service';
import { CreditCardController } from 'src/app/URL';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-credit-card-details-view-page',
  templateUrl: './credit-card-details-view-page.component.html',
  styleUrls: ['./credit-card-details-view-page.component.css'],
})
export class CreditCardDetailsViewPageComponent implements OnInit {
  CardSideNavData = CreditCardSideNavData;
  PageData = PageData;

  SubNavDataID = '';
  SelectSubNavDataID = 'account-summary';
  ShowCardData = false;

  insta_loan_tab = {
    tab: 1,
    loading: true,
    tenure: '3',
    loan_amount: '',
  };
  AccountNumber: any = '';
  SelectedCreditCard: any = {
    card_name: '',
    card_type: '',
    card_number: '',
    expiryDate: '',
    active: '',
    balance: '',
    card_limit: '',
    cvv: 'XXX',
  };

  creditCardPaymentTab = {
    tab: 1,
    amountSelect: '',
    loading: false,
  };

  CreditCardHotlistingTab = {
    tab: 1,
    loading: true,
    reason: '',
    remarks: '',
  };

  InstantPinGenerationTab = {
    tab: 1,
    loading: true,
    pin: '',
    re_pin: '',
  };

  constructor(
    private dataTransferService: DataTransferService,
    private toastr: ToastrService,
    private userService: UserDataServiceService,
    private creditController: CreditCardControllerService,
    private loanController: LoanAccountService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    Object.assign(this.SelectedCreditCard, this.tempSelectedCreditCard);
    this.dataTransferService.SelectCreditCardData.subscribe((data: any) => {
      console.log('->', data);

      Object.assign(this.SelectedCreditCard, data);
    });
    console.log(this.SelectedCreditCard);

    // -------- Get Account Number --------

    this.AccountNumber=LoginDetailsService.AccountNumber;
    // const currentDate = new Date();
    // const futureDate = new Date(currentDate);

    // // Add 3 years to the current date
    // futureDate.setFullYear(currentDate.getFullYear() + 3);

    // console.log('Current Date:', currentDate.toLocaleDateString('en-GB'));
    // console.log(
    //   'Date after adding 3 years:',
    //   futureDate.toLocaleDateString('en-GB')
    // );

    // const amount = 1000000;
    // const rate = 7.2;
    // const tenure = 10;

    // const p = amount;
    // const r = rate / 12 / 100;
    // const n = tenure * 12;

    // // P x R x (1+R)^N / [(1+R)^N-1]
    // console.log(p, n, r);

    // const a = p * r * Math.pow(1 + r, n);
    // const b = Math.pow(1 + r, n) - 1;

    // console.log(Math.round(a / b));
  }
  calculateEMI() {
    const rate = 12.5;
    const r = rate / 12 / 100;
    const p = Number(this.insta_loan_tab.loan_amount);
    const n = Number(this.insta_loan_tab.tenure) * 12;
    const a = p * r * Math.pow(1 + r, n);
    const b = Math.pow(1 + r, n) - 1;
    return Math.round(a / b);
  }

  calculateInterest(){
    const r = 12.5;
    const p = Number(this.insta_loan_tab.loan_amount);
    const n = Number(this.insta_loan_tab.tenure) ;

    return p*r*n;

  }

  /************** Sidebar ***************/
  showSubNavData(id: string) {
    if (id == this.SubNavDataID) {
      this.SubNavDataID = '';
      return;
    }
    this.SubNavDataID = id;
  }

  showSelectSubNavDataID(subitem: any, tabid: number) {
    if (tabid == 0) {
      this.SelectSubNavDataID = 'account-summary';
      this.SubNavDataID = '';
      return;
    }

    if (!subitem.active) return;

    this.SelectSubNavDataID = subitem.id;
  }

  /************** credit card payment ***************/

  goToNextPageCreditCardPayment(currentTab: any) {
    console.log(this.creditCardPaymentTab);
    if (currentTab == 1) {
      if (this.creditCardPaymentTab.amountSelect.length == 0) {
        this.toastr.error('', 'Please select amount', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        return;
      }
      this.creditCardPaymentTab.tab++;
      return;
    }
    if (currentTab == 2) {
      this.creditCardPaymentTab.tab++;
      this.creditCardPaymentTab.loading = true;
      const data = {
        user_id: LoginDetailsService.UserId,
        card_number: this.SelectedCreditCard.card_number,
        balance: this.creditCardPaymentTab.amountSelect,
        total_balance: this.SelectedCreditCard.balance,
        account_number: this.AccountNumber,
      };
      this.creditController.creditCardPayment(data).subscribe(
        (data: any) => {
          console.log(data);
          setTimeout(() => {
            this.creditCardPaymentTab.loading = false;
          }, 2000);
        },
        (error) => {
          console.log(error);
        }
      );

      return;
    }

    this.creditCardPaymentTab.tab++;
  }

  gotoHomePage() {
    location.href = '/user/manage-credit-card';
  }

  /************** Account summary - Show Card ***************/

  enterPinNumber() {
    Swal.fire({
      title: 'Enter Card Pin',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (pin) => {
        return fetch(`${CreditCardController}/check-credit-card-pin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: LoginDetailsService.UserId,
            card_number: this.SelectedCreditCard.card_number,
            pin: pin,
          }),
        })
          .then((response: any) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Wrong Pin: Error`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        this.SelectedCreditCard.cvv = result.value.cvv;
        this.ShowCardData = true;
        this.toastr.success('', 'Pin is correct', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      }
    });
  }

  findMinBalance() {
    var num = Number(this.SelectedCreditCard.balance);
    var value = (num * 50) / 100;
    return '' + value;
  }

  /************** insta loan ***************/

  goToNextLoanPage() {
    if (this.insta_loan_tab.loan_amount.length == 0) {
      this.toastr.error('', 'Please Enter Amount', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return;
    }
    if (this.insta_loan_tab.tenure.length == 0) {
      this.toastr.error('', 'Please select Tenure', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return;
    }

    if (Number(this.insta_loan_tab.loan_amount) > 50000) {
      this.toastr.error('', 'Amount is not greater than Eligible Amount', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return;
    }

    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    // console.log(this.datePipe.transform(currentDate, 'dd/MM/yyyy'));


    // Add 3 years to the current date
    futureDate.setFullYear(currentDate.getFullYear() + Number(this.insta_loan_tab.tenure));

    this.insta_loan_tab.tab = 2;

    const data = {
      account_number: this.AccountNumber,
      loan_type: 'Credit Card Personal Loan',
      credit_card_number: this.SelectedCreditCard.card_number,
      loan_amount: this.insta_loan_tab.loan_amount,
      total_tenure: this.insta_loan_tab.tenure,
      interest_rate: '12.5',
      user_id: LoginDetailsService.UserId,
      emi: this.calculateEMI(),
      loan_start_date:this.datePipe.transform(currentDate, 'dd/MM/yyyy'),
      loan_end_date:this.datePipe.transform(futureDate, 'dd/MM/yyyy'),
      current_tenure:2,
      overdue_charges:0,
      payable_amount:this.calculateEMI()*2,
      total_interest:this.calculateInterest()
    };
    console.log(data);

    this.loanController.addLoanData(data).subscribe((data) => {
      console.log(data);
      setTimeout(() => {
        this.insta_loan_tab.loading = false;
      }, 2000);
    });
  }

  getAvailableLimit() {
    return (
      Number(this.SelectedCreditCard.card_limit) -
      Number(this.SelectedCreditCard.balance)
    );
  }

  cardHotListing() {
    if (this.CreditCardHotlistingTab.reason.length == 0) {
      this.toastr.error('', 'Please select reason', {
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'decreasing',
      });
      return;
    }

    this.CreditCardHotlistingTab.tab = 2;

    this.creditController
      .deActivateCreditCard(
        LoginDetailsService.UserId,
        this.SelectedCreditCard.card_number
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          setTimeout(() => {
            this.CreditCardHotlistingTab.loading = false;
          }, 2000);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  instantPinGenerationFunc(prev: any, next: any) {
    if (prev == 1 && next == 2) {
      if (this.InstantPinGenerationTab.pin.length == 0) {
        this.toastr.error('', 'Please enter pin', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        return;
      }
      if (this.InstantPinGenerationTab.pin.length != 4) {
        this.toastr.error('', 'Please enter 4 digit pin', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        return;
      }
      if (this.InstantPinGenerationTab.re_pin.length == 0) {
        this.toastr.error('', 'Please enter re-pin', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        return;
      }

      if (
        this.InstantPinGenerationTab.re_pin != this.InstantPinGenerationTab.pin
      ) {
        this.toastr.error('', 'Pin &  Re-pin are not matched', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        return;
      }
      this.InstantPinGenerationTab.tab = 2;
      return;
    }

    this.InstantPinGenerationTab.tab = 3;

    const data = {
      user_id: LoginDetailsService.UserId,
      card_number: this.SelectedCreditCard.card_number,
      card_pin: this.InstantPinGenerationTab.pin,
    };
    this.creditController.instantPinGeneration(data).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    setTimeout(() => {
      this.InstantPinGenerationTab.loading = false;
    }, 2000);
  }

  tempSelectedCreditCard: any = {
    card_name: 'DEEPENDRA',
    card_type: 'RUPAY SELECT Global Credit Card',
    card_number: '754061174640',
    expiryDate: '11/2026',
    balance: '1000',
    card_limit: '50000',
    active: true,
  };
}
