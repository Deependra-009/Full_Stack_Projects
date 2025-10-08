package com.quickchat.CommonService.request;

import com.quickchat.CommonService.Enum.UpdateMessageType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UpdateMessageRequest {
    private String senderID;
    private String receiverID;
    private String chatID;
    private UpdateMessageType updateMessageType;
}
