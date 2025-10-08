import logo from "./logo.svg";
import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./core/store/store";
import { Login } from "./components/Login/Login";
import {
  getAppData,
  getJwtToken,
  getLoadingData,
  getUserID,
  getUsersChatList,
} from "./core/store/app.selector";
import { useEffect } from "react";
import { SessionStorage } from "./core/constant/SessionStorage";
import { Homepage } from "./components/HomePage/Homepage";
import * as fromAppStore from "./core/store/app.store.service";
import { AppState } from "./core/store/app.state";
import { ServiceStatus } from "./core/enum/service-status.enum";
import { Loader } from "./components/Loader/Loader";
import { fetchUserDataService, fetchUserProfileService } from "./core/services/common.service";
import WebSocketService from "./core/web-socket/WebSocketService";
import { ConversationResponse, MessageResponse } from "./core/Models/chats.model";
import { UpdateMessageResponse } from "./core/Models/update-message-model";
import { UpdateMessageType } from "./core/enum/update-message-type";

function App() {
  const appStateData = useSelector(getAppData);
  const loadingData = useSelector(getLoadingData);
  const userID = useSelector(getUserID);
  const jwtToken = useSelector(getJwtToken);
  const getUsersChat=useSelector(getUsersChatList);
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

      console.log("aaaa");


      /* Connect to WebSocket */
      WebSocketService.connetToWebSocekt(userID);

      /* Message Receiver */
      WebSocketService.connect(userID, (msg) => {

        const messageResponse: MessageResponse = JSON.parse(msg.body);
        const storedData = sessionStorage.getItem(SessionStorage.APPSTORE);
        const appState: AppState = JSON.parse(
          storedData ?? '{"serviceControlData":{}}'
        );


        if(appState.chatsData?.find((item:ConversationResponse)=>item.chatID==messageResponse.chatID)){
          fromAppStore.updateMessageResponseData(dispatch, messageResponse);

          if(appState.userData?.userID==messageResponse.receiverID && messageResponse.chatID==appState.selectedFriend?.chatID){
            WebSocketService.updateMessage({
              chatID:messageResponse.chatID,
              senderID:messageResponse.senderID,
              receiverID:messageResponse.receiverID,
              updateMessageType:UpdateMessageType.BOTH_DELIVERABLE_SEEN_DATE
            });
          }

        }
        else{
          if(userID!=messageResponse.senderID){
            fetchUserDataService(userID??'',messageResponse.senderID,dispatch,messageResponse,false);

          }
          else{
            fetchUserDataService(userID??'',messageResponse.receiverID,dispatch,messageResponse,true);


            // fetchUserDataService(userID??'',receiverID??'',dispatch);
          }

        }

      });

      // Define the callback function to trigger when WebSocket connects
      WebSocketService.setOnConnectCallback(() => {
        setTimeout(() => {
          fromAppStore.fetchUserProfileStart(dispatch);
          handleFetchProfileData();
        }, 2000);
      });

      WebSocketService.statusOnlineOfflineChanged((data:any)=>{
        fromAppStore.updateOnlineStatus(dispatch,data.userId);


        const storedData = sessionStorage.getItem(SessionStorage.APPSTORE);
        const appState: AppState = JSON.parse(
          storedData ?? '{"serviceControlData":{}}'
        );

        const userData=appState?.chatsData?.find((item:ConversationResponse)=>item.userProfile.userID==data.userId);


        if(userData?.messageResponseList[userData.messageResponseList.length-1].receiverID!=data.userId && userData?.messageResponseList[userData.messageResponseList.length-1].messageDeliverableAt==null){
          WebSocketService.updateMessage({
            chatID:userData?.chatID??'',
            senderID:appState.userData?.userID??'',
            receiverID:data.userId,
            updateMessageType:UpdateMessageType.UPDATE_DELIVERABLE_DATE
          });
        }
      })

      WebSocketService.setUpdateMessageCallback((data:UpdateMessageResponse)=>{
        fromAppStore.updateMessageData(dispatch,data);
      })

      return () => {
        WebSocketService.disconnect();
      };
    }
  }, [userID]);

  const handleFetchProfileData = async () => {
    try {
      const response = await fetchUserProfileService(jwtToken ?? "");
      setTimeout(() => {

        fromAppStore.fetchUserProfileSuccess(dispatch, response.data);
      }, 2000);
    } catch (error) {
      fromAppStore.fetchUserProfileError(dispatch);
    }
  };

  return (
    <>
      <BrowserRouter>
        <div className="flex w-[100%]">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/chat" element={<Homepage />} />
          </Routes>
          {loadingData.loading && <Loader />}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
