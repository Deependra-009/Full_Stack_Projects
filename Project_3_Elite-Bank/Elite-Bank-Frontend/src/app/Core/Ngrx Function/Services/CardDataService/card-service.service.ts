import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootReducerState, getCardData, getCardLoaded, getCardLoading } from '../../NGRX/Reducer';
import { Store } from '@ngrx/store';
import { CardDetailsRequestAction } from '../../NGRX/Action/CardDataAction';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  constructor(
    private store: Store<RootReducerState>,
  ) { }

  
  getCardDataObservable(): [Observable<any>, Observable<Boolean>, Observable<Boolean>] {
    
    const loading$ = this.store.select(getCardLoading);
    const loaded$ = this.store.select(getCardLoaded);
    const carddata$ = this.store.select(getCardData);

    return [carddata$, loading$, loaded$];

  }


}
