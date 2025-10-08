import { LoaderType } from "../enum/loader-type.enum";
import { ServiceStatus } from "../enum/service-status.enum";
import { ConversationResponse } from '../Models/chats.model';
import { GroupEntity } from "../Models/group.model";
import { UserLoginResponse } from "../Models/user-login.model";
import { UserProfile } from "../Models/user-profile";

export interface  AppState{
    userData:UserProfile | undefined;
    chatsData:ConversationResponse[] | undefined;
    groupsData?:GroupEntity[] | undefined;
    serviceControlData:ServiceControlData;
    selectedFriend?:ConversationResponse | undefined;
    selectedGroup?:GroupEntity | undefined;
    loader:Loader;
    jwtToken?:string;
    unreadMessageIndex?:number;
    isCreateGroup?:boolean;
    isGroupInfoPageClick?:boolean;
    isContactInfoPageClick?:boolean;
}

export const initialState:AppState={
    userData:undefined,
    chatsData:undefined,
    loader:{
        loading:false,
        type:undefined
    },
    serviceControlData:{}
}

export interface ServiceControlData{
    UserLoginStatus?:ServiceStatus;
    UserProfileStatus?:ServiceStatus;
}

export interface Loader{
    loading:boolean;
    type:LoaderType | undefined;
}
