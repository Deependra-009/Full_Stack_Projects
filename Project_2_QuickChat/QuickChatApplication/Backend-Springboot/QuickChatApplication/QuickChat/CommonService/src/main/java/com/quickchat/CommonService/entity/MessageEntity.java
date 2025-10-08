package com.quickchat.CommonService.entity;


import com.quickchat.CommonService.Enum.ContentType;
import com.quickchat.CommonService.Enum.ConversationType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Table(name="MessageTable")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String messageID;
    private String senderID;
    private String receiverID;
    private ContentType contentType;
    private String messageContent;
    private LocalDateTime messageSentAt;
    private LocalDateTime messageDeliverableAt;
    private LocalDateTime messageSeenAt;
    private String chatID;
    private ConversationType conversationType;

}


