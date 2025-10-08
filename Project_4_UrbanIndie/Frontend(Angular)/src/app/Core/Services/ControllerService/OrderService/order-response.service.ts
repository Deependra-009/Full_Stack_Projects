import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderResponseService {

  private orderResponse: any;

  setOrderResponse(response: any) {
    this.orderResponse = response;
  }

  getOrderResponse() {
    return this.orderResponse;
  }}
