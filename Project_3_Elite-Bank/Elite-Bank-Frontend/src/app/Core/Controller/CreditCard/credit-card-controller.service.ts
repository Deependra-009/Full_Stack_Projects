import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCardController } from 'src/app/URL';

@Injectable({
  providedIn: 'root'
})
export class CreditCardControllerService {

  constructor(
    private http:HttpClient
  ) { }

  addCreditCard(data:any){
    return this.http.post(`${CreditCardController}/add-credit-card`,data);
  }

  getAllCards(user_id:any){
    return this.http.get(`${CreditCardController}/get-all-cards/${user_id}`);
  }

  creditCardPayment(data:any){
    return this.http.post(`${CreditCardController}/credit-card-payment`,data);
  }

  deActivateCreditCard(user_id:any,card_number:string){
    return this.http.delete(`${CreditCardController}/deactivate-credit-card/${user_id}/${card_number}`);
  }

  instantPinGeneration(instantPinData:any){
    return this.http.post(`${CreditCardController}/instant-pin-generation`,instantPinData);
  }
}
