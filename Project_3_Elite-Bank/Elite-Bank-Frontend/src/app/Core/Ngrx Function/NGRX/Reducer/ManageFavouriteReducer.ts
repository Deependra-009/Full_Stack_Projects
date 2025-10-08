
import { Action } from "../Action";
import { MANAGE_FAVOURITE_DETAILS_REQUEST, MANAGE_FAVOURITE_DETAILS_SUCCESS, MANAGE_FAVOURITE_DETAILS_ERROR } from '../Action/ManageFavouriteAction';

export interface ManageFavouriteDetailsReducerState{
    loading:boolean;
    loaded:boolean;
    ManageFavouriteData:any;
    error:boolean;
}

const initialState:ManageFavouriteDetailsReducerState={
    loading:false,
    loaded:false,
    ManageFavouriteData:[],
    error:false
}


export function ManageFavouriteDetailsReducer(state=initialState,action:Action){
    switch(action.type){
        case MANAGE_FAVOURITE_DETAILS_REQUEST:{
            return {...state,loading:true};
        }
        case MANAGE_FAVOURITE_DETAILS_SUCCESS:{
            const resdata=action.payload.ManageFavouriteData;
            console.log(resdata);
            
            return {...state,loading:false,loaded:true,ManageFavouriteData:resdata};
        }
       
        case MANAGE_FAVOURITE_DETAILS_ERROR:{
            return {...state,error:true};
        }

        default:{
            return state;
        }

    }
}

//selectors
export const getLoading=(state:ManageFavouriteDetailsReducerState)=>state.loading;
export const getLoaded=(state:ManageFavouriteDetailsReducerState)=>state.loaded;
export const getManageFavouriteData=(state:ManageFavouriteDetailsReducerState)=>state.ManageFavouriteData;
export const getError=(state:ManageFavouriteDetailsReducerState)=>state.error;
