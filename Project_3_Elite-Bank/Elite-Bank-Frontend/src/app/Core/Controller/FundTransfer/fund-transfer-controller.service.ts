import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FundTransferController } from 'src/app/URL';

@Injectable({
  providedIn: 'root'
})
export class FundTRansferControllerService {

  constructor(
    private http:HttpClient
  ) { }

  fundTransfer(data:any){
    return this.http.post(`${FundTransferController}/transfer-fund`,data);
  }
}
