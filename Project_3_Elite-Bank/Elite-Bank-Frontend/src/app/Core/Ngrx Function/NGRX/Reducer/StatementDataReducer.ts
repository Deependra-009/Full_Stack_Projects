
import { Action } from "../Action";
import { STATEMENT_DETAILS_ERROR, STATEMENT_DETAILS_REQUEST, STATEMENT_DETAILS_SUCCESS } from "../Action/StatementDataAction";

export interface StatementDetailsReducerState{
    loading:boolean;
    loaded:boolean;
    StatementData:any;
    error:boolean;
}

const initialState:StatementDetailsReducerState={
    loading:false,
    loaded:false,
    StatementData:[],
    error:false
}


export function StatementDetailsReducer(state=initialState,action:Action){
    switch(action.type){
        case STATEMENT_DETAILS_REQUEST:{
            return {...state,loading:true};
        }
        case STATEMENT_DETAILS_SUCCESS:{
            const resdata=action.payload.StatementData;
            
            return {...state,loading:false,loaded:true,StatementData:resdata};
        }
       
        case STATEMENT_DETAILS_ERROR:{
            return {...state,error:true};
        }

        default:{
            return state;
        }

    }
}

//selectors
export const getLoading=(state:StatementDetailsReducerState)=>state.loading;
export const getLoaded=(state:StatementDetailsReducerState)=>state.loaded;
export const getStatementData=(state:StatementDetailsReducerState)=>state.StatementData;
export const getError=(state:StatementDetailsReducerState)=>state.error;
