package com.quickchat.CommonService.response;

import com.quickchat.CommonService.Enum.UpdateMessageType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateMessageResponse {
    private LocalDateTime readMessageDateTime;
    private String chatID;
    private UpdateMessageType updateMessageType;
}
