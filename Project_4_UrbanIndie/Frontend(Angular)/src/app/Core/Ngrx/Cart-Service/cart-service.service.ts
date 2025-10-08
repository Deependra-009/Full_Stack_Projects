import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, Observable, take, throwError } from 'rxjs';
import { getCartData, getCartLoaded, getCartLoading, RootReducerState } from '../Ngrx-Functions/Reducers';
import { CartListRequestAction, CartListSucessAction } from '../Ngrx-Functions/Actions/Cart/CartAction';
import { CartApiGatewayService } from '../../APIGateway/CartAPIGateway/cart-api-gateway.service';
import { DataTransferServiceService } from '../../Services/DataTransfer/data-transfer-service.service';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

    constructor(
      private store: Store<RootReducerState>,
      private cartcontroller:CartApiGatewayService,
      private dataTransfer:DataTransferServiceService
    ) { }
  
    getCartObservable():[Observable<any>,Observable<Boolean>,Observable<Boolean>]{
      const loading$ = this.store.select(getCartLoading);
      const loaded$ = this.store.select(getCartLoaded);
      const cartData$ = this.store.select(getCartData);
      return [cartData$,loading$,loaded$];
  
    }
  
    getCartData(force = false,user_id:String) {
      const loading$ = this.store.select(getCartLoading);
      const loaded$ = this.store.select(getCartLoaded);

      
     
      
      combineLatest([loading$, loaded$]).pipe(
        take(1),
      ).subscribe((data) => {
  
        if (!data[0] && !data[1] || force) {
          this.store.dispatch(new CartListRequestAction())
          this.cartcontroller.getProductFromCart(user_id)
          .pipe(
            catchError((error:any)=>{
              return throwError('error')
            })
          )
          .subscribe(
            (data:any)=>{
              this.dataTransfer.CartLength.next(data==undefined?0:data.products.length)
              this.store.dispatch(new CartListSucessAction({ CartData: data }))
            },
            (err)=>{
              // console.log(err);
              
            }
          )
        }
      })
    }
  }
  

