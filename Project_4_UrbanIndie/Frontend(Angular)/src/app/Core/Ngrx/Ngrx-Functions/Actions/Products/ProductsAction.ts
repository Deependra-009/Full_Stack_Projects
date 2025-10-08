import { ProductModal } from "src/app/Shared/Modals/ProductModal";

export const Product_LIST_REQUEST="Product list request";
export const Product_LIST_SUCCESS="Product list success";
export const Product_LIST_ERROR="Product list error";
export const LOAD_MORE_PRODUCTS = "Load more products";

export class ProductListRequestAction{
    readonly type=Product_LIST_REQUEST;
}


export class ProductListSucessAction{
    readonly type=Product_LIST_SUCCESS;

    constructor(public payload?:{ProductData:[]}){

    }
}

export class ProductListErrorAction{
    readonly type=Product_LIST_ERROR;
}

export class LoadMoreProductsAction {
    readonly type = LOAD_MORE_PRODUCTS;
    constructor(public payload?: { ProductData: ProductModal[] }){

    }
  }