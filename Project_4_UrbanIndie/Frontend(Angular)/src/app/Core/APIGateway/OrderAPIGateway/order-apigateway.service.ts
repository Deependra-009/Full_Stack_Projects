import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderController } from '../../Constant_Data/URL';

@Injectable({
  providedIn: 'root'
})
export class OrderAPIGatewayService {

  constructor(
    private http:HttpClient
  ) { }

  public placeOrder(data:any){
    return this.http.post(`${OrderController}/placeorder`,data);
  }

  public getAllOrdersForUser(userId:any,params:any){
    return this.http.get(`${OrderController}/get-all-order-particular-user/${userId}`,{params:params});
  }

  public cancelOrder(orderId:any,userId:any){
    return this.http.patch(`${OrderController}/cancel/${orderId}/${userId}`,{});
  }
}



