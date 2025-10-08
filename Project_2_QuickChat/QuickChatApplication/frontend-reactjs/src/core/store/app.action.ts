import { createAction } from "@reduxjs/toolkit";
import { UserLoginRequest, UserLoginResponse, UserProfileResponse } from "../Models/user-login.model";
import { AppState } from "./app.state";
import { ConversationResponse, MessageResponse } from "../Models/chats.model";
import { LoaderType } from "../enum/loader-type.enum";
import { UpdateMessageResponse } from "../Models/update-message-model";

export const UserLoginStart=createAction(
    '[QUICK-CHAT] User Login Start'
)
export const UserLoginSuccess=createAction<UserLoginResponse>(
    '[QUICK-CHAT] User Login Success'
)

export const UserLoginError=createAction(
    '[QUICK-CHAT] User Login Error'
)

export const UserProfileStart=createAction(
    '[QUICK-CHAT] User Profile Start'
)
export const UserProfileSuccess=createAction<UserProfileResponse>(
    '[QUICK-CHAT] User Profile Success'
)

export const UserProfileError=createAction(
    '[QUICK-CHAT] User Profile Error'
)

export const UserLogout=createAction(
    '[QUICK-CHAT] User Logout'
)

export const SetAllAppState=createAction<AppState>(
    '[QUICK-CHAT] Set All Data'
)

export const SetSelectedFriend=createAction<ConversationResponse>(
    '[QUICK-CHAT] Set Selected Friend'
)

export const LoadingStart=createAction<LoaderType>(
    '[QUICK-CHAT] Loading Start'
)

export const LoadingStop=createAction(
    '[QUICK-CHAT] Loading Stop'
)

export const updateMessageResponseData=createAction<MessageResponse>(
    '[QUICK-CHAT] Update Message Response'
)

export const updateOnlineStatus=createAction<String>(
    '[QUICK-CHAT] Update Online Status'
)

export const updateChatsData=createAction<ConversationResponse>(
    '[QUICK-CHAT] Update ChatsData'
)

export const updateMessageStatus=createAction<UpdateMessageResponse>(
    '[QUICK-CHAT] Update Message'
)