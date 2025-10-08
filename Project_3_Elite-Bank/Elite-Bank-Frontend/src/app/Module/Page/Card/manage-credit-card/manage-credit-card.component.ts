import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditCardControllerService } from 'src/app/Core/Controller/CreditCard/credit-card-controller.service';
import { DataTransferService } from 'src/app/Core/Ngrx Function/Services/DataTransfer/data-transfer.service';
import { LoginDetailsService } from 'src/app/Core/Ngrx Function/Services/LoginDetailsService/login-details.service';

@Component({
  selector: 'app-manage-credit-card',
  templateUrl: './manage-credit-card.component.html',
  styleUrls: ['./manage-credit-card.component.css']
})
export class ManageCreditCardComponent implements OnInit {

  CreditCardData:any=[]

  constructor(
    private creditcard:CreditCardControllerService,
    private dataTransfer:DataTransferService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.creditcard.getAllCards(LoginDetailsService.UserId).subscribe(
      (data:any)=>{
        console.log(data);

        this.CreditCardData=data;
      },
      (error)=>{
        console.log(error);

      }
    );
  }

  // selectDabitCardData

  selectCreditCardData(creditCardData:any){
    if(!creditCardData.active) return;
    this.dataTransfer.setSelectedCreditCardData(creditCardData);
    this.router.navigateByUrl('/user/credit-card-detail');
  }

}
