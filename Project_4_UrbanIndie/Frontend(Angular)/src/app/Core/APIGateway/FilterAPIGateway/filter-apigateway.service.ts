import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterController } from '../../Constant_Data/URL';

@Injectable({
  providedIn: 'root'
})
export class FilterAPIGatewayService {

  constructor(
    private http:HttpClient
  ) { }

  applyFilter(user_id:String,filtername:any){
    let filter: { [key: string]: any } = {};
    filtername.forEach((value:any, key:any) => {
      filter[key] = value;
  });
    return this.http.post(`${FilterController}/apply/NOT_LOGIN`,{
      filterName:filter
    });
  }
}
