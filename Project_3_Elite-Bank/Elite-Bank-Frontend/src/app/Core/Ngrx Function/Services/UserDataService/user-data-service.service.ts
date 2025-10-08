import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootReducerState, getUserData, getUserLoaded, getUserLoading } from '../../NGRX/Reducer';
import { getLoading } from '../../NGRX/Reducer/UserDetailsReducer';
import { BehaviorSubject, Observable, Subject, combineLatest, take } from 'rxjs';
import { UserDetailsErrorAction, UserDetailsRequestAction, UserDetailsSuccessAction } from '../../NGRX/Action/UserDetailsAction';
import { ControllerService } from '../../../Controller/User/controller.service';
import { UserEntity } from '../../../Model/UserEntity';
import { LoginDetailsService } from '../LoginDetailsService/login-details.service';
import { StatementDetailsRequestAction, StatementDetailsSuccessAction } from '../../NGRX/Action/StatementDataAction';
import { BeneficiaryDataServiceService } from '../BeneficiaryDataService/beneficiary-data-service.service';
import { CardDetailsRequestAction, CardDetailsSuccessAction } from '../../NGRX/Action/CardDataAction';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  constructor(
    private store: Store<RootReducerState>,
    private controller: ControllerService,
    private beneficiaryservice: BeneficiaryDataServiceService,
    private router:Router
  ) { }

  private user_id: any = "";
  private account_no: any = "";

  getUserId() {
    return this.user_id;
  }
  getAccountNo() {
    return this.account_no;
  }

  UserId = new Subject<any>();
  AccountNo = new Subject<any>();
  AccountBalance=new BehaviorSubject<any>("0");




  getUserObservable(): [Observable<any>, Observable<Boolean>, Observable<Boolean>] {
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const userdata$ = this.store.select(getUserData);

    return [userdata$, loading$, loaded$];

  }


  getUserData(force = false,user_id:string="") {
    const loading$ = this.store.select(getUserLoading);
    const loaded$ = this.store.select(getUserLoaded);
    const userdata$ = this.store.select(getUserData);

    LoginDetailsService.setUserId(user_id);

    combineLatest([loading$, loaded$]).pipe(
      take(1)
    ).subscribe((data) => {
      if (!data[0] && !data[1] || force) {
        this.store.dispatch(new UserDetailsRequestAction())
        this.store.dispatch(new CardDetailsRequestAction())
        this.controller.getUserData(user_id)
          .subscribe((response: any) => {


            const userData: UserEntity = {
              ...response,
              chart_data: this.convertData(response.statementEntityList)
            };
            this.UserId.next(userData.user_id);
            this.user_id = userData.user_id;
            this.account_no = userData?.accountdata?.account_number;
            this.AccountNo.next(userData?.accountdata?.account_number);
            this.AccountBalance.next(userData?.accountdata?.account_balance);
            localStorage.setItem("ELITE_BANK_ACCOUNT_NUMBER",this.account_no)

            this.beneficiaryservice.getBeneficiaryDataFunction(true);


            setTimeout(() => {
              this.store.dispatch(new StatementDetailsSuccessAction({ StatementData: userData.statementEntityList }))
              // userData.statementEntityList=[]
              this.store.dispatch(new UserDetailsSuccessAction({ UserData: userData }));

              this.store.dispatch(new CardDetailsSuccessAction({
                CardData:{
                  creditcards:response.creditCardEntityList,
                  debitcards:response.debitCardEntityList
                }
              }));

              // this.router.navigateByUrl("/user")



            }
              , 2000)
          },
            (error) => {
              console.log(error);

            })
      }
    })
  }

  convertData(data: any) {

    let yearlyData: any = [
      ['Jan', 0, 0],
      ['Feb', 0, 0],
      ['Mar', 0, 0],
      ['Apr', 0, 0],
      ['May', 0, 0],
      ['Jun', 0, 0],
      ['Jul', 0, 0],
      ['Aug', 0, 0],
      ['Sep', 0, 0],
      ['Oct', 0, 0],
      ['Nov', 0, 0],
      ['Dec', 0, 0]
    ]
    let expenseData: any = [
      ['Shopping', 0],
      ['Food', 0],
      ['Entertainment', 0],
      ['other', 0],
    ]


    if (Array.isArray(data) && data.length != 0) {
      const accountData = data;



      for (let item of accountData) {
        const dateParts = item.transaction_date.split("/");
        const month = parseInt(dateParts[1], 10); // Extract the month value from the start date

        const monthName = new Date(Date.UTC(0, month - 1, 1)).toLocaleString('default', { month: 'short' });
        const abbreviatedMonth = monthName.substr(0, 3);

        if (abbreviatedMonth == 'Jan') {
          if (item.type == 'credit') {
            let tc = yearlyData[0][1] + Number(item.amount);
            yearlyData[0][1] = tc;
          }
          else {
            let td = yearlyData[0][2] + Number(item.amount);
            yearlyData[0][2] = td;
          }

        }
        else if (abbreviatedMonth == 'Feb') {
          if (item.type == 'credit') {
            let tc = yearlyData[1][1] + Number(item.amount);
            yearlyData[1][1] = tc;
          }
          else {
            let td = yearlyData[1][2] + Number(item.amount);
            yearlyData[1][2] = td;
          }
        }
        else if (abbreviatedMonth == 'Mar') {
          if (item.type == 'credit') {
            let tc = yearlyData[2][1] + Number(item.amount);
            yearlyData[2][1] = tc;
          }
          else {
            let td = yearlyData[2][2] + Number(item.amount);
            yearlyData[2][2] = td;
          }
        }
        else if (abbreviatedMonth == 'Apr') {
          if (item.type == 'credit') {
            let tc = yearlyData[3][1] + Number(item.amount);
            yearlyData[3][1] = tc;
          }
          else {
            let td = yearlyData[3][2] + Number(item.amount);
            yearlyData[3][2] = td;
          }
        }
        else if (abbreviatedMonth == 'May') {
          if (item.type == 'credit') {
            let tc = yearlyData[4][1] + Number(item.amount);
            yearlyData[4][1] = tc;
          }
          else {
            let td = yearlyData[4][2] + Number(item.amount);
            yearlyData[4][2] = td;
          }
        }
        else if (abbreviatedMonth == 'Jun') {
          if (item.type == 'credit') {
            let tc = yearlyData[5][1] + Number(item.amount);
            yearlyData[5][1] = tc;
          }
          else {
            let td = yearlyData[5][2] + Number(item.amount);
            yearlyData[5][2] = td;
          }
        }
        else if (abbreviatedMonth == 'Jul') {
          if (item.type == 'credit') {
            let tc = yearlyData[6][1] + Number(item.amount);
            yearlyData[6][1] = tc;
          }
          else {
            let td = yearlyData[6][2] + Number(item.amount);
            yearlyData[6][2] = td;
          }
        }
        else if (abbreviatedMonth == 'Aug') {
          if (item.type == 'credit') {
            let tc = yearlyData[7][1] + Number(item.amount);
            yearlyData[7][1] = tc;
          }
          else {
            let td = yearlyData[7][2] + Number(item.amount);
            yearlyData[7][2] = td;
          }
        }
        else if (abbreviatedMonth == 'Sep') {
          if (item.type == 'credit') {
            let tc = yearlyData[8][1] + Number(item.amount);
            yearlyData[8][1] = tc;
          }
          else {
            let td = yearlyData[8][2] + Number(item.amount);
            yearlyData[8][2] = td;
          }
        }
        else if (abbreviatedMonth == 'Oct') {
          if (item.type == 'credit') {
            let tc = yearlyData[9][1] + Number(item.amount);
            yearlyData[9][1] = tc;
          }
          else {
            let td = yearlyData[9][2] + Number(item.amount);
            yearlyData[9][2] = td;
          }
        }
        else if (abbreviatedMonth == 'Nov') {
          if (item.type == 'credit') {
            let tc = yearlyData[10][1] + Number(item.amount);
            yearlyData[10][1] = tc;
          }
          else {
            let td = yearlyData[10][2] + Number(item.amount);
            yearlyData[10][2] = td;
          }
        }
        else if (abbreviatedMonth == 'Dec') {
          if (item.type == 'credit') {
            let tc = yearlyData[11][1] + Number(item.amount);
            yearlyData[11][1] = tc;
          }
          else {
            let td = yearlyData[11][2] + Number(item.amount);
            yearlyData[11][2] = td;
          }
        }

        if (item.expense_type.toLowerCase() == 'shopping') {
          let t = Number(expenseData[0][1] + Number(item.amount));
          expenseData[0][1] = t;
        }
        else if (item.expense_type.toLowerCase() == 'food') {
          let t = Number(expenseData[1][1] + Number(item.amount));
          expenseData[1][1] = t
        }
        else if (item.expense_type.toLowerCase() == 'entertainment') {
          let t = Number(expenseData[2][1] + Number(item.amount));
          expenseData[2][1] = t
        }
        else {
          let t = Number(expenseData[3][1] + Number(item.amount));
          expenseData[3][1] = t
        }
      }




    }
    return {
      yearlyData: yearlyData,
      expenseData: expenseData
    }
  }
}
