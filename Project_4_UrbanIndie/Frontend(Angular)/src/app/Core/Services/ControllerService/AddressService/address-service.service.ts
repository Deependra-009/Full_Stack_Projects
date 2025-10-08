import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Address } from 'src/app/Shared/Modals/AddressModal';
import { AddressController } from 'src/app/Core/Constant_Data/URL';
import { AddressAPIGatewayService } from 'src/app/Core/APIGateway/AddressAPIGayeway/address-apigateway.service';
@Injectable({
  providedIn: 'root'
})

export class AddressServiceService {
  
  constructor(
    private AddressAPI:AddressAPIGatewayService
  ) { }

   public saveAddress(address:any){
    return this.AddressAPI.addAddress(address);
  }
 
  getAllAddresses(userId: String): Observable<Address[]> {
    const url = `${AddressController}/getAll/${userId}`;
    
    return this.AddressAPI.getAllAddressesOfUser(userId)
      .pipe(
        map((response:any) => response.addresses),
        catchError(error => {
          console.log(error);
          return [];
        })
      );
  }
  deleteAddressByIdAndUserId(id: string, user_id: string){
    return this.AddressAPI.deleteAddressByIdAndUserId(id, user_id);
    
  }
  updateAddress(updatedAddress: any): Observable<any> {
    console.log("from service",updatedAddress);
   return this.AddressAPI.updateAddress(updatedAddress);
  }
}
