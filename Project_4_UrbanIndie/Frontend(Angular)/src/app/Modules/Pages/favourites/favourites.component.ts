import { Component } from '@angular/core';
import { WishListService } from 'src/app/Core/Ngrx/WishList-Service/wish-list.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent {
  WishListData:any=[]

  constructor(
    private wishList:WishListService
   ) { }
   ngOnInit(): void {
     this.wishList.getWishListObservable()[0].subscribe(
       (getdata:any)=>{
         this.WishListData=getdata
        
       }
     )
   }
  public isZeroLength(): boolean {
    return this.WishListData!=undefined && this.WishListData.length === 0;
  }
   items_length_calculator:number=this.WishListData.length;
}
