import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BeneficiaryController } from 'src/app/URL';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryControllerService {

  constructor(
    private http:HttpClient
  ) { }

  addBeneficiary(data:any){
    return this.http.post(`${BeneficiaryController}/add-beneficiary`,data);
  }

  getAllBeneficiary(user_id:any){
    return this.http.get(`${BeneficiaryController}/get-beneficiary/${user_id}`);
  }

  deleteBeneficiary(user_id:any,account_no:string){


    return this.http.delete(`${BeneficiaryController}/delete-beneficiary`,{
      params:{
        "user_id":user_id,
        "account_number":account_no
      }
    })

  }
}
