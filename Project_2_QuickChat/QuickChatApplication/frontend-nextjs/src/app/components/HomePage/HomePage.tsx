"use client";

import { ChatPage } from '@/app/components/ChatPage/ChatPage';
import { ChatWindow } from '@/app/components/ChatWindow/ChatWindow';
import { SideBarMenu } from '@/app/components/SideBarMenu/SideBarMenu';
import { UsersList } from '@/app/components/UsersList/UsersList';
import { SessionStorage } from '@/app/core/constant/SessionStorage';
import { ServiceStatus } from '@/app/core/enum/service-status.enum';
import * as fromAppSelector from '@/app/core/store/app.selector';
import { AppState } from '@/app/core/store/app.state';
import WebSocketService from '@/app/core/web-socket/WebSocketService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@/app/core/Styles/App.css';
import { CreateGroup } from '../CreateGroup/CreateGroup';
import { GroupChatPage } from '../GroupChatPage/GroupChatPage';

export default function Homepage() {

  const dispatch = useDispatch();
  const router=useRouter();

  const serviceControlData = useSelector(fromAppSelector.getServiceControlData);
  const selectedFriend = useSelector(fromAppSelector.getSelectedFriend);
  const createGroupStatus=useSelector(fromAppSelector.getCreateGroupStatus);
  const selectedGroup=useSelector(fromAppSelector.getSelectedGroup);

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
      router.push("/");
      return;
    }
  }, [serviceControlData.UserLoginStatus]);


  return(
    <div className="flex w-[100%]">
      <SideBarMenu />
      <UsersList />
      {selectedFriend == undefined && selectedGroup==undefined && (createGroupStatus==undefined || createGroupStatus==false) && <ChatWindow />}
      {selectedFriend != undefined && selectedGroup==undefined && (createGroupStatus==undefined || createGroupStatus==false) && <ChatPage />}
      {selectedFriend==undefined && selectedGroup!=undefined && createGroupStatus==false && <GroupChatPage/>}
      {createGroupStatus==true && <CreateGroup/>}

    </div>
  )
}
