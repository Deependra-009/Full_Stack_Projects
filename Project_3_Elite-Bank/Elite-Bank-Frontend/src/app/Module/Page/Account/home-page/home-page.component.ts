import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserEntity } from 'src/app/Core/Model/UserEntity';
import { CardServiceService } from 'src/app/Core/Ngrx Function/Services/CardDataService/card-service.service';
import { LoginDetailsService } from 'src/app/Core/Ngrx Function/Services/LoginDetailsService/login-details.service';
import { StatementDataServiceService } from 'src/app/Core/Ngrx Function/Services/StatementDataService/statement-data-service.service';
import { UserDataServiceService } from 'src/app/Core/Ngrx Function/Services/UserDataService/user-data-service.service';
import { CreditCardController, DebitCardController } from 'src/app/URL';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  UserData: UserEntity = {};
  TransactionData: any = [];
  CardData: any = {};
  cardIndex = 0;
  cardType = 1;

  cardLoading = true;
  cardLoaded = false;
  isCebitCardExist =
    this.UserData.creditCardEntityList != null &&
    this.UserData.creditCardEntityList.length != 0;
  isDebitCardExist =
    this.UserData.debitCardEntityList != null &&
    this.UserData.debitCardEntityList.length != 0;

  SelectCardData: any = {};

  Balance: any = '0';
  LoanAmount: any = '0';
  loading = true;
  loaded = false;

  changeCardType(event: any) {
    this.cardType = event.target.value;
    this.showCardData(null);
  }

  showCardData(event: any) {
    this.cardIndex = event == null ? 0 : event.target.value;
    console.log('inside show card data');

    if (this.CardData != undefined && this.cardIndex != undefined) {
      if (
        this.cardType == 1 &&
        this.CardData.creditcards != undefined &&
        this.CardData.creditcards.length != 0
      ) {
        this.SelectCardData = this.CardData.creditcards[this.cardIndex];
        this.SelectCardData = {
          ...this.SelectCardData,
          valid: false,
          cvv: 'xxx',
        };
      } else if (
        this.cardType == 2 &&
        this.CardData.debitcards != undefined &&
        this.CardData.debitcards.length != 0
      ) {
        this.SelectCardData = this.CardData.debitcards[this.cardIndex];
        this.SelectCardData = {
          ...this.SelectCardData,
          valid: false,
          cvv: 'xxx',
        };
      }
    }
  }

  constructor(
    private userservice: UserDataServiceService,
    private statementservice: StatementDataServiceService,
    private cardservice: CardServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.SelectCardData = {
      ...this.SelectCardData,
      valid: false,
      cvv: 'xxx',
    };

    const _userData$ = this.userservice.getUserObservable()[0];
    const _loading$ = this.userservice.getUserObservable()[1];
    const _loaded$ = this.userservice.getUserObservable()[2];

    _loading$.subscribe(
      (data: any) => {
        this.loading = data;
      },
      (error) => {
        console.log(error);
      }
    );

    _loaded$.subscribe(
      (data: any) => {
        this.loaded = data;
      },
      (error) => {
        console.log(error);
      }
    );

    _userData$.subscribe(
      (data: UserEntity) => {
        this.UserData = data;
        console.log(this.UserData);

        this.Balance = this.UserData.accountdata?.account_balance;
        if (this.UserData.accountdata?.account_total_loan != null) {
          this.LoanAmount = this.UserData.accountdata?.account_total_loan;
        }

        this.GraphData.linechart.data = data.chart_data?.yearlyData;
        this.GraphData.piechart.data = data.chart_data?.expenseData;

        this.isCebitCardExist =
          this.UserData.creditCardEntityList != null &&
          this.UserData.creditCardEntityList.length != 0;
        this.isDebitCardExist =
          this.UserData.debitCardEntityList != null &&
          this.UserData.debitCardEntityList.length != 0;
      },
      (error) => {
        console.log(error);
      }
    );

    this.statementservice.getStatementObservable()[0].subscribe(
      (data: any) => {
        this.TransactionData = data;
      },
      (error) => {
        console.log(error);
      }
    );

    const _cardData$ = this.cardservice.getCardDataObservable()[0];
    const _cardloading$ = this.cardservice.getCardDataObservable()[1];
    const _cardloaded$ = this.cardservice.getCardDataObservable()[2];

    _cardData$.subscribe((data: any) => {
      this.CardData = data;
      console.log(data);

      this.showCardData(null);
    });
    _cardloading$.subscribe((data: any) => {
      this.cardLoading = data;
    });
    _cardloaded$.subscribe((data: any) => {
      this.cardLoaded = data;
    });
  }

  LineChart: any = 'LineChart';
  PieChart: any = 'PieChart';
  GraphData: any = {
    piechart: {
      title: 'All Expense (%)',
      data: [],
      columnNames: ['Browser', 'Percentage'],
      options: {
        curveType: 'function',
        legend: { position: 'bottom' },
        chartArea: { width: '90%', height: '70%' },
        titleTextStyle: {
          color: 'black', // any HTML string color ('red', '#cc00cc')
          // fontName: <string>, // i.e. 'Times New Roman'
          fontSize: 25, // 12, 18 whatever you want (don't specify px)
          // bold: <boolean>,    // true or false
          // italic: <boolean>   // true of false
        },
        pieHole: 0.4,
      },
      width: 350,
      height: 400,
    },
    linechart: {
      title: 'Finances',
      data: [],
      columnNames: ['Month', 'Credit', 'Debit'],
      options: {
        curveType: 'function',
        legend: { position: 'top', alignment: 'end' },
        chartArea: { width: '100%', height: '70%' },
        titleTextStyle: {
          color: 'black', // any HTML string color ('red', '#cc00cc')
          // fontName: <string>, // i.e. 'Times New Roman'
          fontSize: 25, // 12, 18 whatever you want (don't specify px)
          // bold: <boolean>,    // true or false
          // italic: <boolean>   // true of false
        },
      },
      width: 600,
      height: 400,
    },
  };

  QuickTransferData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
        return fetch(
          `${
            this.cardType == 1 ? CreditCardController : DebitCardController
          }/check-${this.cardType == 1 ? 'credit' : 'debit'}-card-pin`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: LoginDetailsService.UserId,
              card_number: this.SelectCardData.card_number,
              pin: pin,
            }),
          }
        )
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
        this.SelectCardData.valid = result.value.valid;
        this.SelectCardData.cvv = result.value.cvv;
        this.toastr.success('', 'Pin is correct', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      }
    });
  }
}
