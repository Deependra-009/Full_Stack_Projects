
import { Action } from "../Action";
import { CARD_DETAILS_ERROR, CARD_DETAILS_REQUEST, CARD_DETAILS_SUCCESS } from "../Action/CardDataAction";

export interface CardDetailsReducerState{
    loading:boolean;
    loaded:boolean;
    CardData:any;
    error:boolean;
}

const initialState:CardDetailsReducerState={
    loading:false,
    loaded:false,
    CardData:{},
    error:false
}


export function CardDetailsReducer(state=initialState,action:Action){
    switch(action.type){
        case CARD_DETAILS_REQUEST:{
            return {...state,loading:true};
        }
        case CARD_DETAILS_SUCCESS:{
            const resdata=action.payload.CardData;            
            return {...state,loading:false,loaded:true,CardData:resdata};
        }
       
        case CARD_DETAILS_ERROR:{
            return {...state,error:true};
        }

        default:{
            return state;
        }

    }
}

//selectors
export const getLoading=(state:CardDetailsReducerState)=>state.loading;
export const getLoaded=(state:CardDetailsReducerState)=>state.loaded;
export const getCardData=(state:CardDetailsReducerState)=>state.CardData;
export const getError=(state:CardDetailsReducerState)=>state.error;
