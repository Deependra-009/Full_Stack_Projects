import { Injectable } from '@angular/core';
import { DataTransferServiceService } from '../../DataTransfer/data-transfer-service.service';
import {  ToastrService } from 'ngx-toastr';
import { UserAPIGatewayService } from 'src/app/Core/APIGateway/UserAPIGateway/user-apigateway.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private userapi: UserAPIGatewayService,
    private dataTransfer:DataTransferServiceService,
    private toast:ToastrService
  ) { }
  updateUserData(data: any) {
    
    this.userapi.updateUserData(data).subscribe(
      (res: any) => {
        this.toast.success('Update Successfully!!', '', {
          positionClass: 'toast-top-../../DataTransfer/data-transfer-service.serviceright',
          progressBar: true,
          timeOut: 3000
        })
      },
      (error:any) => {
        console.log(error);
        this.toast.error('Something went wrong', '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          timeOut: 3000
        })
      }
    );
  }

  getUserData(user_id:any){
    
    this.userapi.getUserData(user_id).subscribe(
      (data: any) => {
        this.dataTransfer.UserData.next({
          user_id:data.user_id,
          name:data.name,
          email:data.email,
          gender:data.gender,
          phone_number:data.phone_number,
          picture_url:data.picture_url,
          date_of_birth:data.date_of_birth
        })
      },
      (error:any) => {
        console.log(error);
        // alert("Something Went Wrong");
      }
    );
  
  }
}
