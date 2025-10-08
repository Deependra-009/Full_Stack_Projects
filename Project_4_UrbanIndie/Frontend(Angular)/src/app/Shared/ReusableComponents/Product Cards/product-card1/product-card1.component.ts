import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferServiceService } from 'src/app/Core/Services/DataTransfer/data-transfer-service.service';

@Component({
  selector: 'app-product-card1',
  templateUrl: './product-card1.component.html',
  styleUrls: ['./product-card1.component.css']
})
export class ProductCard1Component {

  @Input() New_Arrival:any=[];
  @Input() ContainerTitle="";

  constructor(
    private router:Router
  ){}

  searchProduct(item:any){  
    
    DataTransferServiceService.removeSearchTextFromCookie();
    DataTransferServiceService.saveSearchText(item.department);
    this.router.navigateByUrl("/search-product");
    
  }

}
