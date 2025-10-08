import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, take, tap } from 'rxjs';
import { getProductData, getProductLoaded, getProductLoading, RootReducerState } from '../Ngrx-Functions/Reducers';
import { LoadMoreProductsAction, ProductListRequestAction, ProductListSucessAction } from '../Ngrx-Functions/Actions/Products/ProductsAction';
import { ProductApiGatewayService } from '../../APIGateway/ProductAPIGateway/product-api-gateway.service';
import { AuthServiceFunctionsService } from '../../Authentication/AuthServiceFunctions/auth-service-functions.service';
import { ProductModal } from 'src/app/Shared/Modals/ProductModal';
import { DataTransferServiceService } from '../../Services/DataTransfer/data-transfer-service.service';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(
    private store: Store<RootReducerState>,
    private productApi: ProductApiGatewayService,
    private dataTransfer:DataTransferServiceService
  ) { }

  getProductObservable(): [Observable<any>, Observable<Boolean>, Observable<Boolean>] {
    const loading$ = this.store.select(getProductLoading);
    const loaded$ = this.store.select(getProductLoaded);
    const productData$ = this.store.select(getProductData);
    return [productData$, loading$, loaded$];

  }

  getProductData(force = false, user_id: String = String(AuthServiceFunctionsService.getAccessUserFromCookie()), link: String = "") {
    const loading$ = this.store.select(getProductLoading);
    const loaded$ = this.store.select(getProductLoaded);

    combineLatest([loading$, loaded$]).pipe(
      take(1),
    ).subscribe((data) => {

      if (!data[0] && !data[1] || force) {

        this.store.dispatch(new ProductListRequestAction())
        this.productApi.getAllProduct(user_id, link).subscribe(
          (data: any) => {
            if (data.last === true) {
              this.dataTransfer.setSpinner(data.last)

            }
          this.store.dispatch(new ProductListSucessAction({ ProductData: data.content }));
          },
          (error) => {
            console.log(error);
          }
        )
      }
    })
  }

  getMoreProducts(
    page: number,
    itemsPerPage: number,
    department: string | null,
    apparelcategory: string | null,
    producttype: string | null
  ): Observable<{ data: ProductModal[], code: number }> {
    const user_id = String(AuthServiceFunctionsService.getAccessUserFromCookie());

    return this.productApi.getMoreProducts(user_id, page, itemsPerPage, department, apparelcategory, producttype)
      .pipe(
        map((response: any) => {
          return {
            data: response.data, // Access the data property in the response
            code: response.code // Access the code property in the response
          };
        }),
        tap((result: { data: ProductModal[], code: number }) => {
          // Dispatch an action to update NgRx state with the new data
          this.store.dispatch(
            new LoadMoreProductsAction({ ProductData: result.data })
          );
        })
      );
  }


  getApparelCategoryData(department_name: string, apparel_category_name: string) {

    return new Promise((resolve, reject) => {
      this.productApi.getApparelCategoryData(department_name, apparel_category_name).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error) => {
          console.log(error);
          reject(error);

        }

      )
    });

  }
}
