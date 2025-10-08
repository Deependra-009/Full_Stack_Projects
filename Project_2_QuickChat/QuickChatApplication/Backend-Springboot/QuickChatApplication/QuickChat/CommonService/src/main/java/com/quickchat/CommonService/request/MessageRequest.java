package com.quickchat.CommonService.request;

import com.quickchat.CommonService.Enum.ContentType;
import com.quickchat.CommonService.Enum.ConversationType;
import com.quickchat.CommonService.entity.FileEntity;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MessageRequest  {

    private String senderID;
    private String receiverID;
    private String chatID;
    private String messageContent;
    private ContentType contentType;
    private boolean userOnline;
    private FileEntity fileData;
    private ConversationType conversationType;

}
