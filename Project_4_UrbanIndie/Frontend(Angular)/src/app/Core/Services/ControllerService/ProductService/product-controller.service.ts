import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, take } from 'rxjs';
import { ProductController } from 'src/app/Core/Constant_Data/URL';
import { ProductListRequestAction, ProductListSucessAction } from 'src/app/Core/Ngrx/Ngrx-Functions/Actions/Products/ProductsAction';
import { RootReducerState, getProductData, getProductLoaded, getProductLoading } from 'src/app/Core/Ngrx/Ngrx-Functions/Reducers';
import { DataTransferServiceService } from '../../DataTransfer/data-transfer-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductControllerService {

  private SearchData: any = [];
  searchQuery: string = ''; 
  
  constructor(
    private http: HttpClient,
    private store: Store<RootReducerState>
  ) { }

  // Method to perform search and update the SearchData
  searchData(searchText: string) {
    this.searchQuery = searchText;
    DataTransferServiceService.saveSearchText(searchText);
    
    this.http.get(`${ProductController}/search-product/${searchText}`).subscribe(
      (res: any) => {       

        this.SearchData = res.content;
        
        this.getSearchData(true); // Trigger getSearchData method with force parameter
      },
      (error) => {
        return "" + error;
      }
    );
  }

  // Method to check if data needs to be fetched from the store or dispatch actions
  getSearchData(force: boolean) {
    const loading$ = this.store.select(getProductLoading);
    const loaded$ = this.store.select(getProductLoaded);
    
    combineLatest([loading$, loaded$]).pipe(
      take(1),
    ).subscribe((data) => {
      if (!data[0] && !data[1] || force) {
        this.store.dispatch(new ProductListRequestAction());
        this.store.dispatch(new ProductListSucessAction({ ProductData: this.SearchData }));
      }
    });
  }

  // Method to return Observables for search data, loading state, and loaded state
  getSearchDataProductObservable(): [Observable<any>, Observable<boolean>, Observable<boolean>] {
    const loading$ = this.store.select(getProductLoading);
    const loaded$ = this.store.select(getProductLoaded);
    const restaurantData = this.store.select(getProductData);

    return [restaurantData, loading$, loaded$];
  }
}
