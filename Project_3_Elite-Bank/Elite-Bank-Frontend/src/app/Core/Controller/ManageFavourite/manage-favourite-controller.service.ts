import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManageFavouriteController } from 'src/app/URL';

@Injectable({
  providedIn: 'root'
})
export class ManageFavouriteControllerService {

  constructor(
    private http:HttpClient
  ) { }

  addFavourite(data:any){
    return this.http.post(`${ManageFavouriteController}/add-favourite`,data);
  }

  getFavouriteData(user_id:any){
    return this.http.get(`${ManageFavouriteController}/get-all-favourite/${user_id}`);
  }

  deleteFavouriteTransaction(user_id:string,favourite_id:string){
    

    return this.http.delete(`${ManageFavouriteController}/delete-favourite`,{
      params:{
        "user_id":user_id,
        "favourite_transaction_id":favourite_id
      }
    })
  
  }
  

}