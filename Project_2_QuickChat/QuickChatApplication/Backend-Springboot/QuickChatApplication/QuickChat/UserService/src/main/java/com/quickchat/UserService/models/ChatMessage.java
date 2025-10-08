package com.quickchat.UserService.models;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatMessage {
    private String senderId;
    private String recipientId;
    private String content;
    private String timestamp;

    // getters and setters
}
