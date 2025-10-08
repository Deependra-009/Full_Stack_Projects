import { CartModal } from "src/app/Shared/Modals/CartModal";
import { Action } from "../../Actions";
import { Cart_LIST_CHANGE_QUANTITY, Cart_LIST_ERROR,Cart_LIST_CHANGE_Product_Specs,
     Cart_LIST_FAVOURITE_STATUS, Cart_LIST_REQUEST, Cart_LIST_SUCCESS,
      Cart_REMOVE_ALL_PRODUCT, Cart_REMOVE_PARTICULAR_PRODUCT } from "../../Actions/Cart/CartAction";
import { DataTransferServiceService } from "src/app/Core/Services/DataTransfer/data-transfer-service.service";

export interface CartReducerState {
    loading: boolean;
    loaded: boolean;
    CartData: CartModal;
    error: boolean;
}
const initialState: CartReducerState = {
    loading: false,
    loaded: false,
    CartData: <CartModal>{},
    error: false

}


export function CartReducer(state = initialState, action: Action) {
    switch (action.type) {
        case Cart_LIST_REQUEST: {
            return { ...state, loading: true }
        }

        case Cart_LIST_SUCCESS: {
            const resdata = action.payload.CartData;
            return { ...state, loading: false, loaded: true, CartData: resdata };
        }
        case Cart_LIST_FAVOURITE_STATUS:{
            const resdata=state.CartData;
            const product_id = action.payload.product_id;


            let newarraydata = []
            newarraydata = resdata.products.map(
                (item: any, index) => {
                    const updatedItem = { ...item };

                    if (item.product_id == product_id) {
                        // Modify the new object with the updated quantity
                        updatedItem.addInWishList=!item.addInWishList;
                    }
                    return updatedItem;
                }
            );
            const newcartdata={
                cart_id:resdata.cart_id,
                user_id:resdata.user_id,
                products:newarraydata
            }
            return { ...state, loading: false, loaded: true, CartData: newcartdata };


        }

        case Cart_REMOVE_ALL_PRODUCT:{
            const resdata=state.CartData;
            const newcartdata={
                cart_id:resdata.cart_id,
                user_id:resdata.user_id,
                products:[]
            }
            return { ...state, loading: false, loaded: true, CartData: newcartdata };

        }
        case Cart_REMOVE_PARTICULAR_PRODUCT:{
            const oldcartdata=state.CartData;
            const product_id = action.payload.product_id;
            let new_cart=[]
            new_cart=oldcartdata.products.filter(
                (item:any)=>{
                    if(item.product_id!=product_id){
                        return item;
                    }
                }

            );

            const newcartdata={
                cart_id:oldcartdata.cart_id,
                user_id:oldcartdata.user_id,
                products:new_cart
            }
            return { ...state, loading: false, loaded: true, CartData: newcartdata };

        }

        case Cart_LIST_CHANGE_QUANTITY: {
            let oldcartdata = state.CartData;
            const product_id = action.payload.product_id;
            const quantity = action.payload.quantity;
            let newarraydata = []
            newarraydata = oldcartdata.products.map(
                (item: any, index) => {
                    const updatedItem = { ...item };

                    if (item.product_id == product_id) {
                        // Modify the new object with the updated quantity
                        updatedItem.product_quantity = quantity;
                    }
                    return updatedItem;
                }
            );
            const newcartdata={
                cart_id:oldcartdata.cart_id,
                user_id:oldcartdata.user_id,
                products:newarraydata
            }

            return { ...state, loading: false, loaded: true, CartData: newcartdata };
        }

        case Cart_LIST_CHANGE_Product_Specs: {
            const oldCartData = state.CartData;
            const product_id = action.payload.product_id;
            const quantity = action.payload.quantity;
            const selectedProductColour = action.payload.selectedProductColour;
            const selectedProductSize = action.payload.selectedProductSize;


            const newProducts = oldCartData.products.map((item: any) => {
              if (item.product_id === product_id) {

                const updatedItem = {
                  ...item,
                  product_quantity: quantity !== undefined ? quantity : item.product_quantity,
                  selectedProductColour: selectedProductColour !== undefined ? selectedProductColour : item.selectedProductColour,
                  selectedProductSize: selectedProductSize !== undefined ? selectedProductSize : item.selectedProductSize,
                };
                return updatedItem;
              }
              return item;
            });


            const newCartData = {
              ...oldCartData,
              products: newProducts,
            };

            return { ...state, loading: false, loaded: true, CartData: newCartData };
          }





        case Cart_LIST_ERROR: {
            return { ...state, error: true }
        }

        default: {
            return state;
        }
    }
}


//selectors
export const getCartLoading = (state: CartReducerState) => state.loading;
export const getCartLoaded = (state: CartReducerState) => state.loaded;
export const getCartData = (state: CartReducerState) => state.CartData;
export const getError = (state: CartReducerState) => state.error;