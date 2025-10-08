import { Injectable } from '@angular/core';
import { ManageFavouriteControllerService } from '../../../Controller/ManageFavourite/manage-favourite-controller.service';
import { RootReducerState, getManageFavouriteData, getManageFavouriteLoaded, getManageFavouriteLoading } from '../../NGRX/Reducer';
import { Store } from '@ngrx/store';
import { ManageFavouriteDetailsRequestAction, ManageFavouriteDetailsSuccessAction } from '../../NGRX/Action/ManageFavouriteAction';
import { Observable, combineLatest, take } from 'rxjs';
import { LoginDetailsService } from '../LoginDetailsService/login-details.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManageFavouriteServiceService {

  constructor(
    private favouritecontroller:ManageFavouriteControllerService,
    private store: Store<RootReducerState>,
    private toastr:ToastrService,
    private router:Router
  ) { }

  addFavouritePayment(data:any){
    this.favouritecontroller.addFavourite(data).subscribe(
      (data:any)=>{
        console.log(data);
        this.getManageFavouriteData(true);
        this.toastr.success('', 'Transaction Save Successufull !!!', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
        })
        window.location.href='/user/fund-transfer-page'
      },
      (error)=>{
        console.log(error);

      }

    );
  }

  getManageFavouriteObservable(): [Observable<any>, Observable<Boolean>, Observable<Boolean>] {
    const loading$ = this.store.select(getManageFavouriteLoading);
    const loaded$ = this.store.select(getManageFavouriteLoaded);
    const favouritedata$ = this.store.select(getManageFavouriteData);

    return [favouritedata$, loading$, loaded$];

  }


  getManageFavouriteData(force = false) {
    const loading$ = this.store.select(getManageFavouriteLoading);
    const loaded$ = this.store.select(getManageFavouriteLoaded);
    const favouritedata$ = this.store.select(getManageFavouriteData);

    combineLatest([loading$, loaded$]).pipe(
      take(1)
    ).subscribe((data) => {
      if (!data[0] && !data[1] || force) {
        this.store.dispatch(new ManageFavouriteDetailsRequestAction())
        this.favouritecontroller.getFavouriteData(LoginDetailsService.UserId)
          .subscribe((response: any) => {

            this.store.dispatch(new ManageFavouriteDetailsSuccessAction({ManageFavouriteData:response}));

          },
            (error) => {
              console.log(error);

            })
      }
    })
  }

  deleteFavouriteTransacton(fav_data:any){
    return new Promise((resolve,reject)=>{
      try{
        this.favouritecontroller.deleteFavouriteTransaction(fav_data.user_id,fav_data.favourite_id).subscribe(
          (data:any)=>{
            resolve(data);
          },
          (error)=>{
            reject(error);
          }
        )
      }
      catch(err){
        reject(err);

      }
    })
  }
}
