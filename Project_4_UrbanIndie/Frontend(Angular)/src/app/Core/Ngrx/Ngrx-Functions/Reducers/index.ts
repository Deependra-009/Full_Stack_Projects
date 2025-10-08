import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromProduct from './Products/ProductsReducer';
import * as fromCart from './Cart/CartReducers';
import * as fromWishList from './WishList/WishListReducers'

export interface RootReducerState{
    product:fromProduct.ProductReducerState;
    cart:fromCart.CartReducerState;
    wishList:fromWishList.WishReducerState;
}

export const rootReducer:ActionReducerMap<RootReducerState>={
    product:fromProduct.ProductReducer,
    cart:fromCart.CartReducer,
    wishList:fromWishList.WishReducer
}



export const getProductState=(state:RootReducerState)=>state.product;

export const getProductLoaded=createSelector(getProductState,fromProduct.getLoaded);
export const getProductLoading=createSelector(getProductState,fromProduct.getLoading);
export const getProductData=createSelector(getProductState,fromProduct.getProductData);
export const getProductError=createSelector(getProductState,fromProduct.getError);


//cart 

export const getCartState=(state:RootReducerState)=>state.cart;

export const getCartLoaded=createSelector(getCartState,fromCart.getCartLoaded);
export const getCartLoading=createSelector(getCartState,fromCart.getCartLoading);
export const getCartData=createSelector(getCartState,fromCart.getCartData);
export const getCartError=createSelector(getCartState,fromCart.getError);


//WishList

export const getWishListState=(state:RootReducerState)=>state.wishList;

export const getWishListLoaded=createSelector(getWishListState,fromWishList.getWishListLoaded);
export const getWishListLoading=createSelector(getWishListState,fromWishList.getWishListLoading);
export const getWishListData=createSelector(getWishListState,fromWishList.getWishListData);
export const getWishListError=createSelector(getWishListState,fromWishList.getError);
