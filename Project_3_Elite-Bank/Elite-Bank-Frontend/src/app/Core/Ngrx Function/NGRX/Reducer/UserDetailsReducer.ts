import { Action } from "../Action/index";
import { UserEntity } from "src/app/Core/Model/UserEntity";
import {  USER_DETAILS_ERROR, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../Action/UserDetailsAction";

export interface UserDetailsReducerState{
    loading:boolean;
    loaded:boolean;
    UserData:any;
    error:boolean;
}

const initialState:UserDetailsReducerState={
    loading:false,
    loaded:false,
    UserData:<any>{},
    error:false
}

export function UserDetailsReducer(state=initialState,action:Action){
    switch(action.type){
        case USER_DETAILS_REQUEST:{
            return {...state,loading:true};
        }
        case USER_DETAILS_SUCCESS:{
            const resdata=action.payload.UserData;
            
            return {...state,loading:false,loaded:true,UserData:resdata};
        }
       
        case USER_DETAILS_ERROR:{
            return {...state,error:true};
        }

        default:{
            return state;
        }

    }
}

//selectors
export const getLoading=(state:UserDetailsReducerState)=>state.loading;
export const getLoaded=(state:UserDetailsReducerState)=>state.loaded;
export const getUserData=(state:UserDetailsReducerState)=>state.UserData;
export const getError=(state:UserDetailsReducerState)=>state.error;