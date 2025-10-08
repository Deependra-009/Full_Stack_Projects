export const Cart_LIST_REQUEST="Cart list request";
export const Cart_LIST_SUCCESS="Cart list success";
export const Cart_LIST_ERROR="Cart list error";
export const Cart_LIST_CHANGE_QUANTITY="Cart change quantity";
export const Cart_LIST_CHANGE_Product_Specs="Cart change, updated specifications sucessfully";
export const Cart_REMOVE_ALL_PRODUCT="Cart remove all product";
export const Cart_REMOVE_PARTICULAR_PRODUCT="Cart remove particular product";
export const Cart_LIST_FAVOURITE_STATUS="change status favourite from cart"
export class CartListRequestAction{
    readonly type=Cart_LIST_REQUEST;
}


export class CartListSucessAction{
    readonly type=Cart_LIST_SUCCESS;

    constructor(public payload?:{CartData:{}}){

    }
}

export class CartListChangeQuantity{
    readonly type=Cart_LIST_CHANGE_QUANTITY;
    constructor(public payload?:{quantity:any,product_id:any}){
    }
}
export class CartListChangeSpecifications{
    readonly type=Cart_LIST_CHANGE_Product_Specs;
    constructor(public payload?:{quantity?:String,product_id:String,selectedProductColour?: string;selectedProductSize?: string;}){
    }
}
export class CartFavouriteStatusChange{
    readonly type=Cart_LIST_FAVOURITE_STATUS;
    constructor(public payload?:{product_id:any}){
        
    }
}

export class CartRemoveParticularProduct{
    readonly type=Cart_REMOVE_PARTICULAR_PRODUCT;
    constructor(public payload?:{product_id:any}){
        
    }
}
export class CartRemoveAllProduct{
    readonly type=Cart_REMOVE_ALL_PRODUCT;
}

export class CartListErrorAction{
    readonly type=Cart_LIST_ERROR;
}
