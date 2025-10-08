package com.quickchat.CommonService.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CreateGroupRequest {

    private String groupName;
    private String adminUserID;
    private String groupDescription;
    private String groupImage;
    private List<String> groupMembersUserID;

}
