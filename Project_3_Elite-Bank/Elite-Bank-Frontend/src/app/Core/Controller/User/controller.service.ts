import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserController } from 'src/app/URL';
import { UserEntity } from '../../Model/UserEntity';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(
    private http:HttpClient
  ) { }

  addUser(user_data:any){
    return this.http.post(`${UserController}/add-user-data`,user_data);
  }

  // change user id into logindata.json
  getUserData(user_id:any){
    return this.http.get<any>(`${UserController}/get-user/${user_id}`);
  }

  loginUser(login_data:any){
    return this.http.post(`${UserController}/login`,login_data);
  }

}
