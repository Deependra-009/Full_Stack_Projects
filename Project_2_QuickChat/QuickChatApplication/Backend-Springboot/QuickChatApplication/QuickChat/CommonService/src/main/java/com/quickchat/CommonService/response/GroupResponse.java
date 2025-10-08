package com.quickchat.CommonService.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroupResponse {

    private String groupID;
    private String groupName;
    private String groupImage;
    private String groupDescription;
    private String adminUserID;
    private String chatID;
    private List<UserProfile> membersList;
    private List<MessageResponse> messageResponseList;

}
