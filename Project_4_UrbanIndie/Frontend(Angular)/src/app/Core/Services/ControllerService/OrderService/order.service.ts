import { Injectable } from '@angular/core';
import {  HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderAPIGatewayService } from 'src/app/Core/APIGateway/OrderAPIGateway/order-apigateway.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private orderapi:OrderAPIGatewayService
  ) {}

  placeOrder(orderData: any): Observable<any> {
    return this.orderapi.placeOrder(orderData);
  }
  
  testplaceOrder(orderData: any): void {
    console.log('Order data to be sent:', orderData);
  }
  getAllOrdersForUser(userId: string, year?: number, month?: number, all?:boolean): Observable<any> {
    
    
    let params = new HttpParams();

     if (year) {
       params = params.set('year', year);
     }
 
     if (month) {
       params = params.set('month', month);
     }
     if (all !== undefined) {
      params = params.set('all', all); 
  }
    return this.orderapi.getAllOrdersForUser(userId,params);
  }

  cancelOrder(orderId: string,user_id:string): Observable<any> {
    
    return this.orderapi.cancelOrder(orderId,user_id);
  }
  
}
