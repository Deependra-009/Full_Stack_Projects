import { ConversationType } from "../enum/conversation-type.enum";
import { GroupEntity } from "./group.model";
import { UserProfile } from "./user-profile";


export interface ConversationResponse{
    chatID:string;
    userProfile:UserProfile;
    unreadMessage?:number;
    messageResponseList:MessageResponse[];
}


export interface MessageResponse{
    senderID:string;
    receiverID:string;
    messageID:string;
    chatID:string;
    contentType:ContentType,
    messageContent:string;
    messageSentAt:Date;
    messageDeliverableAt:Date | undefined,
    messageSeenAt:Date | undefined;
    isReceived:boolean;
    fileData?:FileData
    conversationType:ConversationType;
}

export interface MessageRequest{
    senderID:string;
    receiverID:string;
    chatID:string;
    messageContent?:string;
    contentType:ContentType;
    userOnline?:boolean;
    fileData?:FileData
    conversationType:ConversationType
}

export interface FileData{
    fileName:string;
    fileType:string,
    fileData:any
}

export enum ContentType{
    TEXT,
    AUDIO,
    VIDEO,
    FILE
}