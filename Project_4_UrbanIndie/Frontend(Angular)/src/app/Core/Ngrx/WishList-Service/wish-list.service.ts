import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, Observable, take, throwError } from 'rxjs';
import { getWishListData, getWishListLoaded, getWishListLoading, RootReducerState } from '../Ngrx-Functions/Reducers';
import { WishListRequestAction, WishListSucessAction } from '../Ngrx-Functions/Actions/Wishlist/WishListAction';
import { WishlistAPIGatewayService } from '../../APIGateway/WishlistAPIGateway/wishlist-apigateway.service';
import { DataTransferServiceService } from '../../Services/DataTransfer/data-transfer-service.service';


@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(
    private store: Store<RootReducerState>,
    private wishlistapi:WishlistAPIGatewayService,
    private datatransfer:DataTransferServiceService
  ) { }

  getWishListObservable(): [Observable<any>, Observable<Boolean>, Observable<Boolean>] {
    const loading$ = this.store.select(getWishListLoading);
    const loaded$ = this.store.select(getWishListLoaded);
    const WishListData$ = this.store.select(getWishListData);
    return [WishListData$, loading$, loaded$];

  }

  getWishListData(force = false, user_id:String) {
    const loading$ = this.store.select(getWishListLoading);
    const loaded$ = this.store.select(getWishListLoaded);
    const WishListData$ = this.store.select(getWishListData);



    combineLatest([loading$, loaded$]).pipe(
      take(1),
    ).subscribe((data) => {

      if (!data[0] && !data[1] || force) {
        this.store.dispatch(new WishListRequestAction())

        this.wishlistapi.getAllProductFromWishlist(user_id)
        .subscribe(
          (data:any)=>{



            this.store.dispatch(new WishListSucessAction({ WishData:  data.products}));
          },
          (error:any)=>{

          }

        );



        // this.store.dispatch(new WishListSucessAction({ WishData:  }))

      }
    })
  }

}
