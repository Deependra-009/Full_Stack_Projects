import * as fromAppStates from './app.state';
import * as fromAppActions from './app.action';

import { createReducer } from "@reduxjs/toolkit";
import { ServiceStatus } from '../enum/service-status.enum';
import { SessionStorage } from '../constant/SessionStorage';
import { LoaderType } from '../enum/loader-type.enum';
import { ConversationResponse, MessageResponse } from '../Models/chats.model';
import { UpdateMessageType } from '../enum/update-message-type';
import WebSocketService from '../web-socket/WebSocketService';

const reducer=createReducer(
    fromAppStates.initialState,
    (builder)=>{
        builder
        .addCase(fromAppActions.UserLoginStart,(state)=>{
            state.userData=undefined;
            state.chatsData=undefined;
            state.loader={
                loading:true,
                type:LoaderType.LOGIN
            }
            state.serviceControlData={
                ...state.serviceControlData,
                UserLoginStatus:ServiceStatus.LOADING
            }
        })
        .addCase(fromAppActions.UserLoginSuccess,(state,action)=>{
            sessionStorage.setItem(SessionStorage.JWT_TOKEN,action.payload.jwtToken);
            state.loader={
                loading:true,
                type:LoaderType.CONNECT_TO_SERVER
            }
            state.jwtToken=action.payload.jwtToken;
            state.userData=action.payload.userProfile;
            state.serviceControlData={
                ...state.serviceControlData,
                UserLoginStatus:ServiceStatus.SUCCESS
            }
        })
        .addCase(fromAppActions.UserLoginError,(state)=>{
            state.loader={
                loading:false,
                type:undefined
            }
            state.serviceControlData={
                ...state.serviceControlData,
                UserLoginStatus:ServiceStatus.FAIL
            }
        })
        .addCase(fromAppActions.UserProfileStart,(state)=>{
            state.loader={
                loading:true,
                type:LoaderType.FETCHING_DATA
            }
            state.serviceControlData={
                ...state.serviceControlData,
                UserProfileStatus:ServiceStatus.LOADING
            }
        })
        .addCase(fromAppActions.UserProfileSuccess,(state,action)=>{
            state.loader={
                loading:false,
                type:undefined
            }
            state.chatsData=action.payload.conversationEntitySet;
            state.groupsData=action.payload.groupResponseList;
            state.chatsData=state.chatsData.map((item:ConversationResponse)=>{
                let countUnreadMessage=0;
                item.messageResponseList.forEach((message:MessageResponse)=>{
                    if(message.messageSeenAt==undefined && message.senderID!=state.userData?.userID) countUnreadMessage++;
                })
                item.unreadMessage=countUnreadMessage;
                if(
                    countUnreadMessage!=0 &&
                    item.messageResponseList.length>0 &&
                    item.messageResponseList[item.messageResponseList.length-1].messageDeliverableAt==null
                ){
                    WebSocketService.updateMessage({
                        chatID:item?.chatID??'',
                        senderID:item.messageResponseList[item.messageResponseList.length-1].senderID,
                        receiverID:item.messageResponseList[item.messageResponseList.length-1].receiverID,
                        updateMessageType:UpdateMessageType.UPDATE_DELIVERABLE_DATE
                      });
                }
                return item;
            })
            state.serviceControlData={
                ...state.serviceControlData,
                UserProfileStatus:ServiceStatus.SUCCESS
            }
        })
        .addCase(fromAppActions.UserProfileError,(state)=>{
            state.loader={
                loading:false,
                type:undefined
            }
            state.serviceControlData={
                ...state.serviceControlData,
                UserProfileStatus:ServiceStatus.FAIL
            }
        })
        .addCase(fromAppActions.UserLogout,(state)=>{
            state.userData=undefined;
            state.chatsData=undefined;
            state.groupsData=undefined;
            state.selectedFriend=undefined;
            state.groupsData=undefined;
            state.selectedGroup=undefined;
            state.serviceControlData={}
            sessionStorage.removeItem(SessionStorage.APPSTORE);
            sessionStorage.removeItem(SessionStorage.JWT_TOKEN);
        })
        .addCase(fromAppActions.SetAllAppState,(state,action)=>{
            state.loader={
                loading:true,
                type:LoaderType.CONNECT_TO_SERVER
            }
            state.jwtToken=action.payload.jwtToken;
            state.userData=action.payload.userData;
            state.serviceControlData=action.payload.serviceControlData;

        })
        .addCase(fromAppActions.SetSelectedFriend,(state,action)=>{
            state.isCreateGroup=false;
            state.selectedGroup=undefined;
            state.chatsData=state.chatsData?.map((item:ConversationResponse)=>{
                if(item.chatID==action.payload.chatID){
                    item.unreadMessage=0;
                }
                return item;
            })
            state.selectedFriend=action.payload;
        })
        .addCase(fromAppActions.setSelectedGroup,(state,action)=>{
            state.isCreateGroup=false;
            state.selectedFriend=undefined;
            state.selectedGroup=action.payload;
        })
        .addCase(fromAppActions.LoadingStart,(state,action)=>{
            state.loader={
                loading:true,
                type:action.payload
            }
        })
        .addCase(fromAppActions.LoadingStop,(state)=>{
            state.loader={
                loading:false,
                type:undefined
            }
        })
        .addCase(fromAppActions.updateMessageResponseData,(state,action)=>{
            state.chatsData=state.chatsData?.map((item:ConversationResponse)=>{
                if(action.payload.chatID==item.chatID){
                    item.messageResponseList=[
                        ...item.messageResponseList,
                        action.payload
                    ]
                    if(action.payload.chatID!=state.selectedFriend?.chatID && state.selectedFriend?.userProfile?.userID!=action.payload.senderID && action.payload.senderID!=state.userData?.userID){
                        item.unreadMessage=(item.unreadMessage??0)+1;
                    }
                }
                return item;
            })
            if(state.selectedFriend && state.selectedFriend.chatID==action.payload.chatID){
                state.selectedFriend.unreadMessage=0;
                if(state.selectedFriend.messageResponseList!=null){
                    state.selectedFriend.messageResponseList=[
                        ...state.selectedFriend.messageResponseList,
                        action.payload
                    ]
                }
                else{
                    state.selectedFriend.messageResponseList=[
                       action.payload
                    ]
                }
            }

            const index=state.chatsData?.findIndex((item:ConversationResponse)=>item.chatID==action.payload.chatID);
            if(index){
                const item=state.chatsData?.splice(index==-1?0:index,1)[0];
                if(item){
                    state.chatsData?.unshift(item);
                }

            }


        })
        .addCase(fromAppActions.updateOnlineStatus,(state,action)=>{
            state.chatsData=state.chatsData?.map((item:ConversationResponse)=>{
                if(item.userProfile.userID==action.payload){
                    item.userProfile.online=!item.userProfile.online;
                }
                return item;
            })
            if(state.selectedFriend && state.selectedFriend.userProfile.userID==action.payload){
                state.selectedFriend.userProfile.online=!state.selectedFriend?.userProfile.online;
            }

        })
        .addCase(fromAppActions.updateChatsData,(state,action)=>{
            if(state.chatsData){
                let countUnreadMessage=0;
                state.chatsData=[
                    ...state.chatsData,
                    action.payload
                ]
                action.payload.messageResponseList.forEach((item:MessageResponse)=>{
                    if(item.messageSeenAt==undefined && state.userData?.userID!=item.senderID) countUnreadMessage++;
                })
                action.payload.unreadMessage=countUnreadMessage;
            }
        })
        .addCase(fromAppActions.updateMessageStatus,(state,action)=>{
            state.chatsData=state.chatsData?.map((item:ConversationResponse)=>{
                if(item.chatID==action.payload.chatID){
                    item.messageResponseList=item.messageResponseList.map((message:MessageResponse)=>{
                        if(message.messageSeenAt==null){
                            if(action.payload.updateMessageType==UpdateMessageType.UPDATE_DELIVERABLE_DATE){
                                message.messageDeliverableAt=action.payload.readMessageDateTime;
                            }
                            else if(action.payload.updateMessageType==UpdateMessageType.UPDATE_SEEN_DATE){
                                message.messageSeenAt=action.payload.readMessageDateTime;
                            }
                            else if(action.payload.updateMessageType==UpdateMessageType.BOTH_DELIVERABLE_SEEN_DATE){
                                message.messageDeliverableAt=action.payload.readMessageDateTime;
                                message.messageSeenAt=action.payload.readMessageDateTime;

                            }
                        }
                        return message;
                    })
                }
                return item;
            })
            if(action.payload.chatID==state.selectedFriend?.chatID){
                state.selectedFriend.messageResponseList=state.selectedFriend.messageResponseList.map((message:MessageResponse)=>{
                    if(message.messageSeenAt==null){
                        if(action.payload.updateMessageType==UpdateMessageType.UPDATE_DELIVERABLE_DATE){
                            message.messageDeliverableAt=action.payload.readMessageDateTime;
                        }
                        else if(action.payload.updateMessageType==UpdateMessageType.UPDATE_SEEN_DATE){
                            message.messageSeenAt=action.payload.readMessageDateTime;
                        }
                        else if(action.payload.updateMessageType==UpdateMessageType.BOTH_DELIVERABLE_SEEN_DATE){
                            message.messageDeliverableAt=action.payload.readMessageDateTime;
                            message.messageSeenAt=action.payload.readMessageDateTime;

                        }
                    }
                    return message;
                })
            }

        })
        .addCase(fromAppActions.createGroupStatusChange,(state,action)=>{
            state.selectedFriend=undefined;
            state.selectedGroup=undefined;
            state.isCreateGroup=action.payload;
        })
        .addCase(fromAppActions.createGroup,(state,action)=>{
            if(state.groupsData!=undefined){
                state.groupsData=[
                    ...state.groupsData,
                    action.payload
                ]
            }
            else{
                state.groupsData=[
                    action.payload
                ]
            }
        })
        .addCase(fromAppActions.updateGroupMessage,(state,action)=>{
            state.groupsData=state.groupsData?.map((groupItem)=>{
                if(groupItem.chatID==action.payload.chatID){
                    groupItem.messageResponseList=[
                        ...groupItem.messageResponseList,
                        action.payload
                    ]
                    return groupItem;
                }
                else return groupItem;
            })

            if(state.selectedGroup?.messageResponseList!=undefined){
                state.selectedGroup.messageResponseList=[
                    ...state.selectedGroup?.messageResponseList,
                    action.payload
                ]
            }
        })
        .addCase(fromAppActions.closeAllChats,(state)=>{
            console.log("dbschds");

            state.selectedGroup=undefined;
            state.selectedFriend=undefined;


        })

    }
)

export default reducer;