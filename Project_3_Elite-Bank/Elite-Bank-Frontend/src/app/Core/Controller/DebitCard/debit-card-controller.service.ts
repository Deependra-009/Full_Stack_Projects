import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DebitCardController } from 'src/app/URL';

@Injectable({
  providedIn: 'root'
})
export class DebitCardControllerService {

  constructor(
    private http:HttpClient
  ) { }

  addDebitCard(data:any){
    return this.http.post(`${DebitCardController}/add-data`,data);
  }

  getAllCards(user_id:any){
    return this.http.get(`${DebitCardController}/get-all-cards/${user_id}`);
  }

  upgradeDebitCardType(debit_card:any){
    console.log(debit_card);

    return this.http.patch(`${DebitCardController}/upgrade-debit-card`,debit_card);
  }

  deActivateDebitCard(user_id:any,card_number:string){
    return this.http.delete(`${DebitCardController}/deactivate-debit-card/${user_id}/${card_number}`);
  }

  instantPinGeneration(instantPinData:any){
    return this.http.post(`${DebitCardController}/instant-pin-generation`,instantPinData);
  }
}
