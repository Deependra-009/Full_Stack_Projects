import { Component, OnInit } from '@angular/core';
import { BeneficiaryDataServiceService } from 'src/app/Core/Ngrx Function/Services/BeneficiaryDataService/beneficiary-data-service.service';

@Component({
  selector: 'app-manage-beneficiary',
  templateUrl: './manage-beneficiary.component.html',
  styleUrls: ['./manage-beneficiary.component.css']
})
export class ManageBeneficiaryComponent  implements OnInit{

  AllBeneficiaryData:any=[]
  
  constructor(
    private beneficiaryService:BeneficiaryDataServiceService
  ) { }

  ngOnInit(): void {
    this.beneficiaryService.getBeneficiaryObservable()[0].subscribe(
      (data:any)=>{
        this.AllBeneficiaryData=data
        console.log(data);
        
      }
    )
  }

  deleteBenefiacry(beneficiaryData:any){
    this.beneficiaryService.deleteBeneficiaryData(beneficiaryData);
    this.AllBeneficiaryData=this.AllBeneficiaryData.filter((item:any)=>item.account_number!==beneficiaryData.account_number)
  }

}
