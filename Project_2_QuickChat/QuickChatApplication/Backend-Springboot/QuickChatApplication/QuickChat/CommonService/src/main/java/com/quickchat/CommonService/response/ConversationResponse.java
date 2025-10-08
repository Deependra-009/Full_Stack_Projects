package com.quickchat.CommonService.response;

import java.time.LocalDateTime;
import java.util.List;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConversationResponse {

    private String chatID;
    private UserProfile userProfile;
    private List<MessageResponse> messageResponseList;

    public LocalDateTime getRecentData(){
        if(messageResponseList!=null && !messageResponseList.isEmpty()){
            return messageResponseList.get(messageResponseList.size()-1).getMessageSentAt();
        }
        else{
            return null;
        }

    }

}
