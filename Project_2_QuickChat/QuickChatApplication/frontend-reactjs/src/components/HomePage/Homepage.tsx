import { useNavigate } from "react-router-dom";
import { SideBarMenu } from "../SideBarMenu/SideBarMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedFriend,
  getServiceControlData,
  getUserID,
} from "../../core/store/app.selector";
import { useEffect } from "react";
import { ServiceStatus } from "../../core/enum/service-status.enum";
import { UsersList } from "../UsersList/UsersList";
import { ChatWindow } from "../ChatWindow/ChatWindow";
import { ChatPage } from "../ChatPage/ChatPage";
import { SessionStorage } from "../../core/constant/SessionStorage";
import { AppState } from "../../core/store/app.state";
import WebSocketService from "../../core/web-socket/WebSocketService";
import * as fromAppStore from "./../../core/store/app.store.service";
import { MessageResponse } from "../../core/Models/chats.model";

export const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const serviceControlData = useSelector(getServiceControlData);
  const selectedFriend = useSelector(getSelectedFriend);
  const userID = useSelector(getUserID);

  useEffect(() => {
    const storedData = sessionStorage.getItem(SessionStorage.APPSTORE);
    const appState: AppState = JSON.parse(
      storedData ?? '{"serviceControlData":{}}'
    );

    if (
      serviceControlData.UserLoginStatus != ServiceStatus.SUCCESS &&
      appState.serviceControlData.UserLoginStatus != ServiceStatus.SUCCESS
    ) {
      WebSocketService.disconnect();
      navigate("/");
      return;
    }
  }, [serviceControlData.UserLoginStatus]);


  return (
    <>
      <SideBarMenu />
      <UsersList />
      {selectedFriend == undefined && <ChatWindow />}
      {selectedFriend != undefined && <ChatPage />}
    </>
  );
};
