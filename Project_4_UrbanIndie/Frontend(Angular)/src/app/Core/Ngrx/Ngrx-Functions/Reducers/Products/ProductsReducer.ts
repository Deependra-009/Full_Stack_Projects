import { ProductModal } from "src/app/Shared/Modals/ProductModal";
import { Action } from "../../Actions";
import { Product_LIST_ERROR, Product_LIST_REQUEST, Product_LIST_SUCCESS,LOAD_MORE_PRODUCTS } from "../../Actions/Products/ProductsAction";

export interface ProductReducerState{
    loading:boolean;
    loaded:boolean;
    ProductData:ProductModal[];
    newProductData:ProductModal[];
    error:boolean;
}
const initialState:ProductReducerState={
    loading:false,
    loaded:false,
    ProductData:[],
    newProductData: [],
    error:false

}


export function ProductReducer(state=initialState,action:Action){
    switch(action.type){
        // case Product_LIST_REQUEST:{
        //     return {...state,loading:true,loaded:false}
        // }
        case Product_LIST_REQUEST: {
            const updatedNewProductData: ProductModal[] = [];
           return { ...state, loading: true, loaded: false, newProductData: updatedNewProductData };
          }
        case  Product_LIST_SUCCESS:{
            const resdata=action.payload.ProductData;
            return {...state,loading:false,loaded:true,ProductData:resdata};
        }
        case Product_LIST_ERROR:{
            return {...state,error:true}
        }


        case LOAD_MORE_PRODUCTS: {
            const resdata = action.payload.ProductData;
            // Append the newly loaded products to both existing and new product data arrays
            const updatedProductData = [...state.ProductData, ...resdata];
            const updatedNewProductData = [...state.newProductData, ...resdata];
            return { ...state, ProductData: updatedProductData, newProductData: updatedNewProductData };
          }
        default:{
            return state;
        }
    }
}


//selectors
export const getLoading=(state:ProductReducerState)=>state.loading;
export const getLoaded=(state:ProductReducerState)=>state.loaded;
export const getProductData=(state:ProductReducerState)=>state.ProductData;
export const getNewProductData = (state: ProductReducerState) => state.newProductData;
export const getError=(state:ProductReducerState)=>state.error;