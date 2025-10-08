package com.quickchat.UserService.models.Response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserRegisterResponse {

    private String userID;
    private String userEmail;
    private String userPhoneNumber;
    private String userName;
    private String userPhotoURL;
    private boolean isUserDisabled;
}
