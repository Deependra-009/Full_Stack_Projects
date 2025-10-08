import { Injectable } from '@angular/core';
import { WishlistAPIGatewayService } from '../../APIGateway/WishlistAPIGateway/wishlist-apigateway.service';
import { RootReducerState } from '../../Ngrx/Ngrx-Functions/Reducers';
import { Store } from '@ngrx/store';
import { ProductListRequestAction, ProductListSucessAction } from '../../Ngrx/Ngrx-Functions/Actions/Products/ProductsAction';
import { WishListRequestAction, WishListSucessAction } from '../../Ngrx/Ngrx-Functions/Actions/Wishlist/WishListAction';
import { WishListService } from '../../Ngrx/WishList-Service/wish-list.service';
import { CartApiGatewayService } from '../../APIGateway/CartAPIGateway/cart-api-gateway.service';
import { DataTransferServiceService } from '../DataTransfer/data-transfer-service.service';
import { CartListSucessAction, CartRemoveAllProduct, CartRemoveParticularProduct } from '../../Ngrx/Ngrx-Functions/Actions/Cart/CartAction';
import { ProductServiceService } from '../../Ngrx/Product-Service/product-service.service';
import { AuthServiceFunctionsService } from '../../Authentication/AuthServiceFunctions/auth-service-functions.service';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {
  WishListData: any = []
  ProductData: any = []

  constructor(
    private wishlistapi: WishlistAPIGatewayService,
    private store: Store<RootReducerState>,
    private wishList: WishListService,
    private cartApi: CartApiGatewayService,
    private dataTransfer: DataTransferServiceService,
    private productservice: ProductServiceService,
  ) {

    this.wishList.getWishListObservable()[0].subscribe(
      (data: any) => {
        this.WishListData = data;
      },
      (error) => {
        console.log(error);

      }
    )

    this.productservice.getProductObservable()[0].subscribe(
      (data: any) => {
        this.ProductData = data;
      },
      (error) => {
        console.log(error);

      }
    );
  }

  // ------- ADD TO FAVOURITE ---------------
  addToFavorites(item: any, event: any) {

    event.stopPropagation();

    const updatedItem = { ...item };
    updatedItem.addInWishList = true;

    const requestDTO = {
      user_id: String(AuthServiceFunctionsService.getAccessUserFromCookie()),
      product_id: item.product_id,
    }
    this.wishlistapi.addProductInWishlist(requestDTO).subscribe(
      (data: any) => {

        if (this.WishListData.length == 0) {

          this.WishListData = [
            updatedItem
          ]
        }
        else {
          this.WishListData = [
            ...this.WishListData,
            updatedItem
          ]
        }
        let newdata: any = []
        newdata = this.ProductData.map((product: any) => {
          const updatedItem = { ...product };
          if (item.product_id == updatedItem.product_id) {
            updatedItem.addInWishList = true;
          }
          return updatedItem;
        });
        this.store.dispatch(new ProductListRequestAction());
        this.store.dispatch(new ProductListSucessAction({ ProductData: newdata }));
        this.store.dispatch(new WishListRequestAction());
        this.store.dispatch(new WishListSucessAction({ WishData: this.WishListData }))
      }
    );




  }

  // ------- ADD TO CART ---------------
  addToCart(item: any, event: any) {
    event.stopPropagation();
    const requestDTO = {
      user_id: String(AuthServiceFunctionsService.getAccessUserFromCookie()),
      product_id: item.product_id,
      product_quantity: "1"
    }

    this.cartApi.addProductInCart(requestDTO).subscribe(
      (data: any) => {
        this.dataTransfer.CartLength.next(data == undefined ? 0 : data.products.length)
        let newdata: any = []
        newdata = this.WishListData.map((product: any) => {
          const updatedItem = { ...product };

          if (item.product_id == updatedItem.product_id) {
            // Modify the new object with the updated quantity
            updatedItem.addInCart = true;
          }
          return updatedItem;
        });

        this.store.dispatch(new WishListSucessAction({ WishData: newdata }));
        // 
        this.store.dispatch(new CartListSucessAction({ CartData: data }))
        this.store.dispatch(new ProductListSucessAction({ ProductData: newdata }));

      },
      (error) => {
        console.log(error);

      }
    );



  }

  // ------- REMOVE FROM FAVOURITE ---------------
  removeFromFavorites(item: any, event: any, isFavPage: Boolean) {
    event.stopPropagation();


    this.wishlistapi.removeProductFromWishList(String(AuthServiceFunctionsService.getAccessUserFromCookie()), item.product_id).subscribe(
      (data: any) => {

        if (this.WishListData.length != 0) {
          this.WishListData = this.WishListData.filter((product: any) => {
            if (product.product_id != item.product_id) return product;
          })
        }
        
        this.store.dispatch(new WishListRequestAction());
        this.store.dispatch(new WishListSucessAction({ WishData: this.WishListData }))

        let newdata: any = []

        newdata = this.ProductData.map((product: any) => {
          const updatedItem = { ...product };
          if (item.product_id == updatedItem.product_id) {
            updatedItem.addInWishList = false;
          }
          return updatedItem;
        });
        this.store.dispatch(new ProductListRequestAction());
        this.store.dispatch(new ProductListSucessAction({ ProductData: newdata }));


      }
    );


    // this.wishList.getWishListData(true, item);
  }

  // ------- REMOVE FROM CART --------------------
  removeFromCart(product_id: any) {

    this.cartApi.removeParticularProductFromCart(String(AuthServiceFunctionsService.getAccessUserFromCookie()), product_id).subscribe(
      (res: any) => {
        this.updateWishListData(product_id, "REMOVE PARTICULAR PRODUCT FROM CART")
        this.dataTransfer.CartLength.next(this.dataTransfer.CartLength.value - 1);
        this.store.dispatch(new CartRemoveParticularProduct({ product_id: product_id }));
      }
    );

  }

  // ------- REMOVE ALL PRODUCT FROM CART ---------------
  removeAllProductFromCart() {
    this.cartApi
      .removeAllProductFromCart(String(AuthServiceFunctionsService.getAccessUserFromCookie()))
      .subscribe(
        (data: any) => {
          this.updateWishListData("", "CLEAR_ALL_CART")
          this.store.dispatch(new CartRemoveAllProduct());
          this.dataTransfer.CartLength.next(0);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  // -------- UPDATE WISH LIST DATA ---------------------
  updateWishListData(product_id: string, choice: any) {
    if (choice == "CLEAR_ALL_CART") {
      let newdata: any = []
      newdata = this.WishListData.map((product: any) => {
        const updatedItem = { ...product };
        updatedItem.addInCart = false;
        return updatedItem;
      });
      this.store.dispatch(new WishListSucessAction({ WishData: newdata }));
    }
    else {
      let newdata: any = []
      newdata = this.WishListData.map((product: any) => {
        const updatedItem = { ...product };

        if (product_id == updatedItem.product_id) {
          // Modify the new object with the updated quantity
          updatedItem.addInCart = false;
        }
        return updatedItem;
      });
      this.store.dispatch(new WishListSucessAction({ WishData: newdata }));
    }
  }

}
