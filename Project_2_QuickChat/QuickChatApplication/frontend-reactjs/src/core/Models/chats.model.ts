import { UserProfile } from "./user-profile";


export interface ConversationResponse{
    chatID:string;
    userProfile:UserProfile;
    messageResponseList:MessageResponse[];
    unreadMessage:number;
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
    messageSeenAt:Date | undefined
}

export interface MessageRequest{
    senderID:string;
    receiverID:string;
    chatID:string;
    messageContent:string;
    contentType:ContentType;
    userOnline:boolean;

}

export enum ContentType{
    TEXT,
    AUDIO,
    VIDEO,
    FILE
}