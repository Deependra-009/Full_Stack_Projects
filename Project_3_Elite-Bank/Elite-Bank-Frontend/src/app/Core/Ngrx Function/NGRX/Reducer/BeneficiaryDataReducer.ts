
import { Action } from "../Action";
import { BENEFICIARY_DETAILS_ERROR, BENEFICIARY_DETAILS_REQUEST, BENEFICIARY_DETAILS_SUCCESS } from "../Action/BeneficiaryDataAction";

export interface BeneficiaryDetailsReducerState{
    loading:boolean;
    loaded:boolean;
    BeneficiaryData:any;
    error:boolean;
}

const initialState:BeneficiaryDetailsReducerState={
    loading:false,
    loaded:false,
    BeneficiaryData:[],
    error:false
}


export function BeneficiaryDetailsReducer(state=initialState,action:Action){
    switch(action.type){
        case BENEFICIARY_DETAILS_REQUEST:{
            return {...state,loading:true};
        }
        case BENEFICIARY_DETAILS_SUCCESS:{
            const resdata=action.payload.BeneficiaryData;
            
            return {...state,loading:false,loaded:true,BeneficiaryData:resdata};
        }
       
        case BENEFICIARY_DETAILS_ERROR:{
            return {...state,error:true};
        }

        default:{
            return state;
        }

    }
}

//selectors
export const getLoading=(state:BeneficiaryDetailsReducerState)=>state.loading;
export const getLoaded=(state:BeneficiaryDetailsReducerState)=>state.loaded;
export const getBeneficiaryData=(state:BeneficiaryDetailsReducerState)=>state.BeneficiaryData;
export const getError=(state:BeneficiaryDetailsReducerState)=>state.error;
