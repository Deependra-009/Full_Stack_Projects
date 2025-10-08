import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginDetailsService {

  constructor() { }

  static UserId=localStorage.getItem('ELITE_BANK_USER_ID')==null?"":localStorage.getItem('ELITE_BANK_USER_ID');

  static AccountNumber=localStorage.getItem('ELITE_BANK_ACCOUNT_NUMBER')==null?"":localStorage.getItem('ELITE_BANK_ACCOUNT_NUMBER');

  static setUserId(id:string){
    this.UserId=id;
  }

  static setAccountNumber(account_number:string){
    this.AccountNumber=account_number;
  }

  static getUserId(){
    return this.UserId;
  }
}
