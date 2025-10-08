import { WishList} from "src/app/Shared/Modals/WishList";
import { Action } from "../../Actions";
import { Wish_LIST_ERROR, Wish_LIST_REQUEST, Wish_LIST_SUCCESS } from "../../Actions/Wishlist/WishListAction";

export interface WishReducerState{
    loading:boolean;
    loaded:boolean;
    WishData:WishList[];
    error:boolean;
}
const initialState:WishReducerState={
    loading:false,
    loaded:false,
    WishData:[],
    error:false

}


export function WishReducer(state=initialState,action:Action){
    switch(action.type){
        case Wish_LIST_REQUEST:{
            return {...state,loading:true}
        }

        case  Wish_LIST_SUCCESS:{
            const resdata=action.payload.WishData;
          
            return {...state,loading:false,loaded:true,WishData:resdata};
        }

        case Wish_LIST_ERROR:{
            return {...state,error:true}
        }

        default:{
            return state;
        }
    }
}


//selectors
export const getWishListLoading=(state:WishReducerState)=>state.loading;
export const getWishListLoaded=(state:WishReducerState)=>state.loaded;
export const getWishListData=(state:WishReducerState)=>state.WishData;
export const getError=(state:WishReducerState)=>state.error;