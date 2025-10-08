import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Toast, ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { StatementControllerService } from 'src/app/Core/Controller/Statement/statement-controller.service';

import { UserEntity } from 'src/app/Core/Model/UserEntity';
import { StatementDataServiceService } from 'src/app/Core/Ngrx Function/Services/StatementDataService/statement-data-service.service';
import { UserDataServiceService } from 'src/app/Core/Ngrx Function/Services/UserDataService/user-data-service.service';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.css'],

})
export class StatementComponent implements OnInit {

  @ViewChild('start') start!: MatDatepicker<Date>;
  selectedStartDate!: Date;

  @ViewChild('end') end!: MatDatepicker<Date>;
  selectedEndDate!: Date;

  today_date = new Date();

  loading = false;
  loaded = false;

  TransactionData: any = {
    start_date: "",
    end_date: "",
    total_credit: "",
    total_debit: "",
    opening_balance: "",
    transaction: []
  };




  UserAccountNo = "";



  constructor(
    private statement: StatementControllerService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private userService: UserDataServiceService,
    private statementService: StatementDataServiceService
  ) { }

  ngOnInit(): void {

    this.statementService.StatementData.subscribe(
      (data: any) => {
        this.TransactionData = data;
        console.log(data);

      },
      (error: any) => {
        console.log(error);

      }
    );



  }

  openStartDatePicker() {
    this.start.open();
  }
  openEndDatePicker() {
    this.end.open();
  }

  searchStatement() {
    console.log("search");

    console.log(this.TransactionData);

    if (this.selectedStartDate == null) {
      this.toastr.error('Error!!', 'Start Date is required', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',

      });
      return;
    }
    if (this.selectedEndDate == null) {
      this.toastr.error('Error!!', 'End Date is required', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',

      });
      return;
    }
    if (this.selectedStartDate > this.selectedEndDate) {
      this.toastr.error('Error!!', 'Start date is not greater than End date', {
        timeOut: 2000,

        progressBar: true,
        progressAnimation: 'decreasing',

      });
      return;
    }
    const data = {
      start: this.datePipe.transform(this.selectedStartDate, 'dd/MM/yyyy'),
      end: this.datePipe.transform(this.selectedEndDate, 'dd/MM/yyyy')
    }


    this.loading = true;
    this.loaded = false;



    // -------- Get Account Number --------

    this.UserAccountNo = this.userService.getAccountNo();
    this.userService.AccountNo.subscribe(
      (data: String) => {
        this.UserAccountNo = String(data);

      },
      (error) => {
        console.log(error);

      }
    );



    this.statement.getParticularStatement(data, this.UserAccountNo).subscribe(
      (response: any) => {
        if (response.length == 0) {
          this.statementService.StatementData.next({
            start_date: data.start,
            end_date: data.end,
            total_credit: "0",
            total_debit: "0",
            opening_balance: "0",
            transaction: []
          })
          this.toastr.error('', 'No Transaction Found', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',

          });
          this.loading = false;
          this.loaded = true;
        }
        else {
          this.toastr.success('', 'Transaction Found Successfully', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',

          });
          this.calculateTotal(response, data);
        }



      },
      (error: any) => {
        console.log("+++++");

        console.log(error);

      }
    );
  }

  private calculateTotal(data: any, searchData: any) {

    console.log(data);

    let total_debit = 0;
    let total_credit = 0;
    for (let item of data) {
      if (item.type == "debit") {
        total_debit += Number(item.amount);
      }
      else if (item.type == "credit") {
        total_credit += Number(item.amount);
      }
    }
    setTimeout(() => {
      console.log(total_credit + " " + total_debit);


      this.statementService.StatementData.next({
        start_date: searchData.start,
        end_date: searchData.end,
        total_credit: total_credit.toString(),
        total_debit: total_debit.toString(),
        opening_balance: data[0].balance,
        transaction: data
      })

      this.loading = false;
      this.loaded = true;
    }, 2000);


  }









}
