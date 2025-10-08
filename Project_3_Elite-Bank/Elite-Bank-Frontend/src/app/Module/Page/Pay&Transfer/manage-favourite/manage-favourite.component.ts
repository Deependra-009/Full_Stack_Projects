import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTransferService } from 'src/app/Core/Ngrx Function/Services/DataTransfer/data-transfer.service';
import { ManageFavouriteServiceService } from 'src/app/Core/Ngrx Function/Services/ManageFavouriteService/manage-favourite-service.service';

@Component({
  selector: 'app-manage-favourite',
  templateUrl: './manage-favourite.component.html',
  styleUrls: ['./manage-favourite.component.css']
})
export class ManageFavouriteComponent implements OnInit {

  FavouritePaymentData:any=[]

  constructor(
    private favouriteservice:ManageFavouriteServiceService,
    private datatransfer:DataTransferService,
    private router:Router,
    private toastr:ToastrService
  ){}

  ngOnInit(): void {
    if(this.FavouritePaymentData.length==0){
      this.favouriteservice.getManageFavouriteData(true);
    }
    this.favouriteservice.getManageFavouriteObservable()[0].subscribe(
      (data:any)=>{
        this.FavouritePaymentData=data
        
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  deleteFavouriteTransaction(item:any){
    
    this.favouriteservice.deleteFavouriteTransacton(item)
    .then((data:any)=>{
      this.FavouritePaymentData=this.FavouritePaymentData.filter((data:any)=>item.favourite_id!=data.favourite_id);
      this.toastr.success('', 'Delete Successfully !!!', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
      })
      
    })
    .catch((error:any)=>{
      console.log(error);
      
    })
    
  }

  selectFavouriteTransaction(item:any){
    this.datatransfer.SelectAccount.next(item);
    this.router.navigateByUrl(`/user/payment-page/${item.ifsc_code==null?'same-bank':'different-bank'}`)
  }



}
