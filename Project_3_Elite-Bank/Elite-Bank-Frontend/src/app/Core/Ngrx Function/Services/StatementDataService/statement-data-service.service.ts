import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, take } from 'rxjs';
import { RootReducerState, getStatementData, getStatementLoaded, getStatementLoading } from '../../NGRX/Reducer';
import { Store } from '@ngrx/store';
import { StatementControllerService } from 'src/app/Core/Controller/Statement/statement-controller.service';
import { StatementDetailsRequestAction, StatementDetailsSuccessAction } from '../../NGRX/Action/StatementDataAction';
import { LoginDetailsService } from '../LoginDetailsService/login-details.service';


@Injectable({
  providedIn: 'root'
})
export class StatementDataServiceService {

  StatementData = new BehaviorSubject<any>({
    start_date: "",
    end_date: "",
    total_credit: "",
    total_debit: "",
    opening_balance: "",
    transaction: []
  });

  constructor(
    private store: Store<RootReducerState>,
    private statementcontroller: StatementControllerService
  ) { }

  getStatementObservable(): [Observable<any>, Observable<Boolean>, Observable<Boolean>] {
    const loading$ = this.store.select(getStatementLoading);
    const loaded$ = this.store.select(getStatementLoaded);
    const statementdata$ = this.store.select(getStatementData);

    return [statementdata$, loading$, loaded$];
  }

  getStatementData(force = false, account_no: String) {
    const loading$ = this.store.select(getStatementLoaded);
    const loaded$ = this.store.select(getStatementLoaded);
    const userdata$ = this.store.select(getStatementData);

    combineLatest([loading$, loaded$]).pipe(
      take(1)
    ).subscribe((data) => {
      if (!data[0] && !data[1] || force) {
        this.store.dispatch(new StatementDetailsRequestAction())
        this.statementcontroller.getCurrentMonthStatement(account_no)
          .subscribe((response: any) => {

            console.log(response);
            setTimeout(() => {

              this.store.dispatch(new StatementDetailsSuccessAction({ StatementData: response }))
            }
              , 2000)
          },
            (error) => {
              console.log(error);

            })
      }
    })
  }
}
