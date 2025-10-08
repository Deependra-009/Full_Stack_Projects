import { ConversationResponse } from "./chats.model";
import { GroupEntity } from "./group.model";
import { UserProfile } from "./user-profile";

export interface UserLoginRequest{
    userEmail:string;
    userPassword:string;
}


export interface UserLoginResponse{
    userProfile:UserProfile;
    jwtToken:string;
}

export interface UserProfileRequest{
    jwtToken?:string;
    userID?:string;
}

export interface UserProfileResponse{
    conversationEntitySet:ConversationResponse[]
    groupResponseList:GroupEntity[]
}

