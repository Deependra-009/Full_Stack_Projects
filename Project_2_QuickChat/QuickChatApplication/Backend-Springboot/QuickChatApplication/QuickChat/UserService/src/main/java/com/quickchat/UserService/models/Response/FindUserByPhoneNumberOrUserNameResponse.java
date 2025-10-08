package com.quickchat.UserService.models.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FindUserByPhoneNumberOrUserNameResponse {

    private String id;
    private String userEmail;
    private String userPhoneNumber;
    private String userAbout;
    private String userProfilePhoto;
    private String userName;
    private LocalDateTime userLastSeen;
    private boolean isUserDisabled;

}