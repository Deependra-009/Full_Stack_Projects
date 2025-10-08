import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  SelectAccount=new BehaviorSubject({});

  SelectDebitCardData=new BehaviorSubject({});
  SelectCreditCardData=new BehaviorSubject({});

  SelectLoanData=new BehaviorSubject({});

  constructor() { }

  setSelectedDebitCardData(data:any){
    this.SelectDebitCardData.next(data);
  }

  setSelectedCreditCardData(data:any){
    this.SelectCreditCardData.next(data);
  }

  setAccount(data:any){
   this.SelectAccount.next(data);
  }

  setLoanData(data:any){
    this.SelectLoanData.next(data);
  }
}
