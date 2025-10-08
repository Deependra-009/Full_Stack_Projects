import * as fromAppActions from './app.action';
import { UserLoginResponse, UserProfileResponse } from '../Models/user-login.model';
import { AppState } from './app.state';
import { ConversationResponse, MessageResponse } from '../Models/chats.model';
import { LoaderType } from '../enum/loader-type.enum';
import { UpdateMessageRequest, UpdateMessageResponse } from '../Models/update-message-model';


export const fetchUserLoginStart=(dispatch:any)=>{
    dispatch(fromAppActions.UserLoginStart());
}

export const fetchUserLoginSuccess=(dispatch:any,userLoginResponse:UserLoginResponse)=>{
    dispatch(fromAppActions.UserLoginSuccess(userLoginResponse))
}

export const fetchUserLoginError=(dispatch:any)=>{
    dispatch(fromAppActions.UserLoginError());
}

export const fetchUserLogout=(dispatch:any)=>{
    dispatch(fromAppActions.UserLogout());
}

export const setAllAppData=(dispatch:any,appState:AppState)=>{
    dispatch(fromAppActions.SetAllAppState(appState));
}

export const setSelectedFriend=(dispatch:any,conversationResponse:ConversationResponse)=>{
    dispatch(fromAppActions.SetSelectedFriend(conversationResponse))
}

export const setLoginStart=(dispatch:any,loaderType:LoaderType)=>{
    dispatch(fromAppActions.LoadingStart(loaderType));
}

export const setLoginStop=(dispatch:any)=>{
    dispatch(fromAppActions.LoadingStop());
}

export const fetchUserProfileStart=(dispatch:any)=>{
    dispatch(fromAppActions.UserProfileStart());
}

export const fetchUserProfileSuccess=(dispatch:any,userProfileResponse:UserProfileResponse)=>{
    dispatch(fromAppActions.UserProfileSuccess(userProfileResponse))
}

export const fetchUserProfileError=(dispatch:any)=>{
    dispatch(fromAppActions.UserProfileError());
}

export const updateMessageResponseData=(disptach:any,message:MessageResponse)=>{
    disptach(fromAppActions.updateMessageResponseData(message))
}

export const updateOnlineStatus=(dispatch:any,userID:string)=>{
    dispatch(fromAppActions.updateOnlineStatus(userID))
}

export const updateChatsData=(dispatch:any,ConversationResponse:ConversationResponse)=>{
    dispatch(fromAppActions.updateChatsData(ConversationResponse))
}

export const updateMessageData=(dispatch:any,updateMessageResponse:UpdateMessageResponse)=>{
    dispatch(fromAppActions.updateMessageStatus(updateMessageResponse))
}
