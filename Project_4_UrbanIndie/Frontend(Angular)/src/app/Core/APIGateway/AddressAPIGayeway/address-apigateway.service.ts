import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressController } from '../../Constant_Data/URL';

@Injectable({
  providedIn: 'root'
})
export class AddressAPIGatewayService {

  constructor(
    private http:HttpClient
  ) { }

  addAddress(item:any){
    return this.http.post(`${AddressController}`,item);
  }

  getAllAddressesOfUser(user_id:String){
    return this.http.get(`${AddressController}/getAll/${user_id}`);
  
  }
  deleteAddressByIdAndUserId(id:String,user_id:String){    
   return this.http.delete(`${AddressController}/${id}/${user_id}`);
  }

  updateAddress(updatedAddress:any){
    return this.http.put(`${AddressController}/${updatedAddress.user_id}/${updatedAddress.id}`,updatedAddress); 
  
  }

  
}
