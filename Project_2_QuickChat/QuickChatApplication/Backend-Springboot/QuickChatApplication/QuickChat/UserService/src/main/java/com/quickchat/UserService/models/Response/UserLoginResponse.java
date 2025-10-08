package com.quickchat.UserService.models.Response;

import com.quickchat.CommonService.response.ConversationResponse;
import com.quickchat.CommonService.response.UserProfile;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserLoginResponse {

    private String jwtToken;
    private UserProfile userProfile;

}

