import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, take } from 'rxjs';
import { getProductData, getProductLoaded, getProductLoading, RootReducerState } from '../Ngrx-Functions/Reducers';
import { ProductListRequestAction, ProductListSucessAction } from '../Ngrx-Functions/Actions/Products/ProductsAction';
import { ProductApiGatewayService } from '../../APIGateway/ProductAPIGateway/product-api-gateway.service';
import { DataTransferServiceService } from '../../Services/DataTransfer/data-transfer-service.service';
import { FilterAPIGatewayService } from '../../APIGateway/FilterAPIGateway/filter-apigateway.service';
import { AuthServiceFunctionsService } from '../../Authentication/AuthServiceFunctions/auth-service-functions.service';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  constructor(
    private store: Store<RootReducerState>,
    private filterAPI: FilterAPIGatewayService,
    private datatransfer:DataTransferServiceService

  ) { }



  getFilterProductData(force = false,user_id:String=String(AuthServiceFunctionsService.getAccessUserFromCookie()),list:any) {

    
    const loading$ = this.store.select(getProductLoading);
    const loaded$ = this.store.select(getProductLoaded);

    
    
    
    
    combineLatest([loading$, loaded$]).pipe(
      take(1),
    ).subscribe((data) => {

      if (!data[0] && !data[1] || force) {
        
        this.store.dispatch(new ProductListRequestAction())
      
        
        this.filterAPI.applyFilter(user_id,list).subscribe(
          (data: any) => {                 
            this.store.dispatch(new ProductListSucessAction({ ProductData: data }));
            
          },
          (error)=>{
            // console.log(error);
            
          }
        )


      }
    })


  }
}
