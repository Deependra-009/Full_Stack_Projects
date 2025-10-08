import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserController } from '../../Constant_Data/URL';

@Injectable({
  providedIn: 'root'
})
export class UserAPIGatewayService {

  constructor(
    private http:HttpClient
  ) { }

  updateUserData(user_data:any){
    return this.http.post(`${UserController}/update`,user_data);
  }

  getUserData(user_id:any){
    return this.http.get(`${UserController}/get-user-data/${user_id}`);
  }

}