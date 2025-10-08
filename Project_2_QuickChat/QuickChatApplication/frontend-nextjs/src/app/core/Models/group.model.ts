import { MessageResponse } from "./chats.model";
import { UserProfile } from "./user-profile"

export interface CreateGroupRequest{
    groupName:string,
    adminUserID:string,
    groupDescription:string,
    groupImage:string,
    groupMembersUserID:string[]
}


export interface GroupEntity{
    groupID:string,
    groupName:string,
    groupImage:string,
    groupDescription:string,
    adminUserID:string,
    chatID:string;
    membersList:UserProfile[],
    messageResponseList:MessageResponse[];
}

