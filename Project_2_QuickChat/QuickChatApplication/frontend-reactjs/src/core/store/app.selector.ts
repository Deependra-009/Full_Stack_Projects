import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import * as fromAppState from './app.state';


const getAppSelector = (state: RootState) => state.app;

export const getAppData=createSelector(getAppSelector,(state:fromAppState.AppState)=>state);

export const getUserData = createSelector(getAppSelector, (state:fromAppState.AppState) => state.userData);

export const getServiceControlData=createSelector(getAppSelector,(state:fromAppState.AppState)=>state.serviceControlData);

export const getUsersChatList=createSelector(getAppSelector,(state:fromAppState.AppState)=>state.chatsData);

export const getSelectedFriend=createSelector(getAppSelector,(state:fromAppState.AppState)=>state.selectedFriend);

export const getUserID=createSelector(getAppSelector,(state:fromAppState.AppState)=>state.userData?.userID);

export const getLoadingData=createSelector(getAppSelector,(state:fromAppState.AppState)=>state.loader);

export const getJwtToken=createSelector(getAppSelector,(state:fromAppState.AppState)=>state.jwtToken);