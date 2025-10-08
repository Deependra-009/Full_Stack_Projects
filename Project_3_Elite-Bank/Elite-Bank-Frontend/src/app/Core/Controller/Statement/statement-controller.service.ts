import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatementController } from 'src/app/URL';

@Injectable({
  providedIn: 'root'
})
export class StatementControllerService {

  constructor(
    private http:HttpClient
  ) { }

  getParticularStatement(data:any,acc_id:any){
    return this.http.post(`${StatementController}/get-particular-statement/${acc_id}`,data);
  }

  getCurrentMonthStatement(account_number:String){
    return this.http.get(`${StatementController}/get-current-month-statement/${account_number}`);
  }
}
