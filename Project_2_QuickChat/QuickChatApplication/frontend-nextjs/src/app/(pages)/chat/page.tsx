"use client";

import Homepage from "@/app/components/HomePage/HomePage";
import { SessionStorage } from "@/app/core/constant/SessionStorage";
import { ServiceStatus } from "@/app/core/enum/service-status.enum";
import * as fromAppSelector from "@/app/core/store/app.selector";
import * as fromAppStore from "@/app/core/store/app.store.service";
import { AppState } from "@/app/core/store/app.state";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WebSocketService from "@/app/core/web-socket/WebSocketService";
import {
  ConversationResponse,
  MessageResponse,
} from "@/app/core/Models/chats.model";
import { UpdateMessageType } from "@/app/core/enum/update-message-type";
import { fetchUserDataService, sendGroupMessage } from "@/app/core/services/common.service";
import { UpdateMessageResponse } from "@/app/core/Models/update-message-model";
import { Loader } from "@/app/components/Loader/Loader";
import { ConversationType } from "@/app/core/enum/conversation-type.enum";
import { fetchUserProfileService } from "../../core/services/common.service";
import { GroupEntity } from "@/app/core/Models/group.model";
import { UserProfile } from "@/app/core/Models/user-profile";

export default function App() {
  const appStateData = useSelector(fromAppSelector.getAppData);
  const loadingData = useSelector(fromAppSelector.getLoadingData);
  const userID = useSelector(fromAppSelector.getUserID);
  const jwtToken = useSelector(fromAppSelector.getJwtToken);
  const getUsersChat = useSelector(fromAppSelector.getUsersChatList);
  const groupList = useSelector(fromAppSelector.getGroupList);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = sessionStorage.getItem(SessionStorage.APPSTORE);
    const appState: AppState = JSON.parse(
      storedData ?? '{"serviceControlData":{}}'
    );

    if (
      appStateData.serviceControlData.UserLoginStatus == undefined &&
      appState.serviceControlData.UserLoginStatus == ServiceStatus.SUCCESS
    ) {
      fromAppStore.setAllAppData(dispatch, appState);
    } else if (
      appStateData.serviceControlData.UserLoginStatus == ServiceStatus.SUCCESS
    ) {
      sessionStorage.setItem(
        SessionStorage.APPSTORE,
        JSON.stringify(appStateData)
      );
    }
  }, [appStateData]);

  useEffect(() => {
    if (userID) {
      /* Connect to WebSocket */
      WebSocketService.connetToWebSocekt(userID);

      /* Message Receiver */
      WebSocketService.connect(userID, (msg) => {
        const messageResponse: MessageResponse = JSON.parse(msg.body);
        console.log(messageResponse);

        console.log(messageResponse.conversationType,
          ConversationType.ONE_TO_ONE_CONVERSATION,messageResponse.conversationType);

        const storedData = sessionStorage.getItem(SessionStorage.APPSTORE);
        const appState: AppState = JSON.parse(
          storedData ?? '{"serviceControlData":{}}'
        );


        if (
          messageResponse.conversationType ==
          ConversationType.ONE_TO_ONE_CONVERSATION
        ) {
          console.log("====>>>");

          if (
            appState.chatsData?.find(
              (item: ConversationResponse) =>
                item.chatID == messageResponse.chatID
            )
          ) {
            fromAppStore.updateMessageResponseData(dispatch, messageResponse);

            if (
              appState.userData?.userID == messageResponse.receiverID &&
              messageResponse.chatID == appState.selectedFriend?.chatID
            ) {
              WebSocketService.updateMessage({
                chatID: messageResponse.chatID,
                senderID: messageResponse.senderID,
                receiverID: messageResponse.receiverID,
                updateMessageType: UpdateMessageType.BOTH_DELIVERABLE_SEEN_DATE,
              });
            }
          } else {
            if (userID != messageResponse.senderID) {
              fetchUserDataService(
                userID ?? "",
                messageResponse.senderID,
                dispatch,
                messageResponse,
                false
              );
            } else {
              fetchUserDataService(
                userID ?? "",
                messageResponse.receiverID,
                dispatch,
                messageResponse,
                true
              );
            }
          }
        } else {
          fromAppStore.updateGroupMessage(dispatch, messageResponse);

          if(appState.groupsData){
            const findGroup=appState.groupsData.find((item:GroupEntity)=>item.chatID==messageResponse.chatID);

            if(findGroup!=undefined){

              findGroup.membersList.forEach((item:UserProfile)=>{
                if(item.userID!=userID){
                  sendGroupMessage({
                    ...messageResponse,
                    receiverID:item.userID
                  })
                }
              })

            }


          }



        }
      });

      // Define the callback function to trigger when WebSocket connects
      WebSocketService.setOnConnectCallback(() => {
        setTimeout(() => {
          fromAppStore.fetchUserProfileStart(dispatch);
          fetchUserProfileService(dispatch, jwtToken ?? "");
        }, 2000);
      });

      WebSocketService.statusOnlineOfflineChanged((data: any) => {
        fromAppStore.updateOnlineStatus(dispatch, data.userId);

        const storedData = sessionStorage.getItem(SessionStorage.APPSTORE);
        const appState: AppState = JSON.parse(
          storedData ?? '{"serviceControlData":{}}'
        );

        const userData = appState?.chatsData?.find(
          (item: ConversationResponse) => item.userProfile.userID == data.userId
        );

        if (
          userData?.messageResponseList[userData.messageResponseList.length - 1]
            .receiverID != data.userId &&
          userData?.messageResponseList[userData.messageResponseList.length - 1]
            .messageDeliverableAt == null
        ) {
          WebSocketService.updateMessage({
            chatID: userData?.chatID ?? "",
            senderID: appState.userData?.userID ?? "",
            receiverID: data.userId,
            updateMessageType: UpdateMessageType.UPDATE_DELIVERABLE_DATE,
          });
        }
      });

      WebSocketService.setUpdateMessageCallback(
        (data: UpdateMessageResponse) => {
          fromAppStore.updateMessageData(dispatch, data);
        }
      );

      WebSocketService.setCreateNewGroupCallback((data:any)=>{
        console.log("==>>",data);

        fromAppStore.createGroup(dispatch,data);
      })

      WebSocketService.setOnSendGroupMessageCallback((data:any)=>{
        console.log("==>>>",data);
        fromAppStore.updateGroupMessage(dispatch, data);

      })

      return () => {
        WebSocketService.disconnect();
      };
    }
  }, [userID]);

  return (
    <div className="flex w-[100%]">
      <Homepage />
      {loadingData.loading && <Loader />}
    </div>
  );
}
