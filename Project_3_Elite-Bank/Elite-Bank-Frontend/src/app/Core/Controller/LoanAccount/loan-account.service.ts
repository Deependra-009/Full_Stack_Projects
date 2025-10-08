import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanAccountController } from 'src/app/URL';

@Injectable({
  providedIn: 'root'
})
export class LoanAccountService {

  constructor(
    private http:HttpClient
  ) { }

  addLoanData(data:any){
    return this.http.post(`${LoanAccountController}/add-loan-data`,data);
  }

  getAllLoanParticularUser(user_id:any,account_number:any){
    return this.http.get(`${LoanAccountController}/get-all-loan-by-user/${user_id}/${account_number}`);
  }


}
