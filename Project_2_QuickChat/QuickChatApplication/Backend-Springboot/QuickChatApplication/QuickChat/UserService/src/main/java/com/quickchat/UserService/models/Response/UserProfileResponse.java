package com.quickchat.UserService.models.Response;

import com.quickchat.CommonService.response.ConversationResponse;
import com.quickchat.CommonService.response.GroupResponse;
import com.quickchat.CommonService.response.UserProfile;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileResponse {
    private List<ConversationResponse> conversationEntitySet;
    private List<GroupResponse> groupResponseList;
}
