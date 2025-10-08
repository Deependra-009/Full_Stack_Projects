import { Component, OnInit } from '@angular/core';
import { DebitCardSideNavData } from 'src/app/Core/Constant/CardSideNavData';
import { LoanSummarySideNavData } from 'src/app/Core/Constant/LoanSummarySideNavData';
import { PageData } from 'src/app/Core/Constant/PageData';
import { DataTransferService } from '../../../../../Core/Ngrx Function/Services/DataTransfer/data-transfer.service';

@Component({
  selector: 'app-loan-summary-view-details',
  templateUrl: './loan-summary-view-details.component.html',
  styleUrls: ['./loan-summary-view-details.component.css'],
})
export class LoanSummaryViewDetailsComponent implements OnInit {
  SelectedLoanData: any = {};

  constructor(private dataTransfer: DataTransferService) {}

  ngOnInit(): void {
    Object.assign(this.SelectedLoanData, this.temploandata);
    this.dataTransfer.SelectLoanData.subscribe((data: any) => {
      console.log(data);
      Object.assign(this.SelectedLoanData, data);
    });
    console.log(this.SelectedLoanData);
  }

  CardSideNavData = LoanSummarySideNavData;
  PageData = PageData;

  SubNavDataID = '';
  SelectSubNavDataID = 'loan-account-details';
  ShowCardData = false;

  LoanAccountDetails = {
    tab1: true,
    tab2: false,
    tab3: false,
    tab4: false,
  };

  RegisterNewLoan = {
    tab1: true,
    tab2: false,
    loading: true,
  };

  loanAccountDetailsTab(tabId: string) {
    if (tabId == 'tab1') {
    }
  }

  funcRegisterNewLoan() {
    this.RegisterNewLoan.loading = true;
    this.RegisterNewLoan.tab1 = false;
    this.RegisterNewLoan.tab2 = true;

    setTimeout(() => {
      this.RegisterNewLoan.loading = false;
    }, 3000);
  }

  showSubNavData(item: any) {
    if (item.class == false) return;
    if (item.id == this.SubNavDataID) {
      this.SubNavDataID = '';
      return;
    }
    this.SubNavDataID = item.id;
  }

  showSelectSubNavDataID(subitem: any, tabid: number) {
    if (tabid == 0) {
      this.SelectSubNavDataID = 'debit-card-status';
      this.SubNavDataID = '';
      return;
    }

    if (!subitem.active) return;

    this.SelectSubNavDataID = subitem.id;
  }

  showCardData() {
    this.ShowCardData = true;
  }

  calculateFuturePrinciple() {
    const halfemi = Number(this.SelectedLoanData.emi) / 2;

    const restPrinciple =
      Number(this.SelectedLoanData.loan_amount) -
      (halfemi - Number(this.SelectedLoanData.current_tenure));

    return '' + restPrinciple;
  }

  temploandata = {
    loan_id: 402,
    loan_number: '9110455550',
    account_number: '992931403138',
    loan_type: 'Credit Card Personal Loan',
    credit_card_number: '754061174640',
    loan_amount: '1000',
    tenure: '3',
    interest_rate: '12.5',
    user_id: '11ca4093-25a4-4654-b125-b23dbeccd68c',
    loan_active: true,
    emi: '33',
    total_tenure: '3',
    current_tenure: '2',
    overdue_charges: '0',
    loan_start_date: '11/01/2024',
    loan_end_date: '11/01/2027',
    total_interest: '37500',
    payable_amount: '66',
  };
}
