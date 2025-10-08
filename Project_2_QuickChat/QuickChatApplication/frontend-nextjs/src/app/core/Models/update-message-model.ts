import { UpdateMessageType } from '../enum/update-message-type';
export interface UpdateMessageRequest{
    chatID:string;
    senderID:string;
    receiverID:string;
    updateMessageType:UpdateMessageType
}

export interface UpdateMessageResponse{
    readMessageDateTime:Date;
    chatID:string;
    updateMessageType:UpdateMessageType
}