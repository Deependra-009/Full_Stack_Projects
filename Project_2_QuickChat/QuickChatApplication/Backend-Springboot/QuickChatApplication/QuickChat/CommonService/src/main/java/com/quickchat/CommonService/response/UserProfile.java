package com.quickchat.CommonService.response;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfile {

    private String userID;
    private String userPhoneNumber;
    private String userName;
    private String userPhotoURL;
    private boolean isUserDisabled;
    private LocalDateTime lastSeen;
    private boolean isOnline;

}
