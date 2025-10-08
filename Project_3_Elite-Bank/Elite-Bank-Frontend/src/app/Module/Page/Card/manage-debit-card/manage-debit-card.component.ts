import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DebitCardControllerService } from 'src/app/Core/Controller/DebitCard/debit-card-controller.service';
import { DataTransferService } from 'src/app/Core/Ngrx Function/Services/DataTransfer/data-transfer.service';
import { LoginDetailsService } from 'src/app/Core/Ngrx Function/Services/LoginDetailsService/login-details.service';

@Component({
  selector: 'app-manage-debit-card',
  templateUrl: './manage-debit-card.component.html',
  styleUrls: ['./manage-debit-card.component.css']
})
export class ManageDebitCardComponent implements OnInit{

  DebitCardData:any=[]

  constructor(
    private debitcard:DebitCardControllerService,
    private dataTransfer:DataTransferService,
    private router:Router
  ){}

  ngOnInit(): void {
      this.debitcard.getAllCards(LoginDetailsService.UserId).subscribe(
        (data:any)=>{
          this.DebitCardData=data;
          console.log(this.DebitCardData);


        },
        (error)=>{
          console.log(error);

        }
      );
  }

  // selectDabitCardData

  selectDebitCardData(debitCardData:any){
    if(!debitCardData.active) return;
    this.dataTransfer.setSelectedDebitCardData(debitCardData);
    this.router.navigateByUrl('/user/debit-card-detail');
  }

}
