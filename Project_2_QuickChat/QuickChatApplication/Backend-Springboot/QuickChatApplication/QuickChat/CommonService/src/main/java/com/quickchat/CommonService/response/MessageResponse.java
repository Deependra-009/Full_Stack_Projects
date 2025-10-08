package com.quickchat.CommonService.response;

import java.time.LocalDateTime;

import com.quickchat.CommonService.Enum.ContentType;
import com.quickchat.CommonService.Enum.ConversationType;
import com.quickchat.CommonService.entity.FileEntity;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MessageResponse {

    private String messageID;
    private String senderID;
    private String receiverID;
    private String chatID;
    private ContentType contentType;
    private String messageContent;
    private LocalDateTime messageSentAt;
    private LocalDateTime messageDeliverableAt;
    private LocalDateTime messageSeenAt;
    private boolean isReceived;
    private FileEntity fileData;
    private ConversationType conversationType;
}