package com.quickchat.CommonService.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quickchat.CommonService.entity.group.GroupEntity;
import com.quickchat.CommonService.entity.group.GroupUserEntity;
import com.quickchat.CommonService.entity.single.ConversationEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Table(name = "UserTable")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UserEntity {

    @Id
    private String userID;
    private String userEmail;
    private String userPhoneNumber;
    private String userAbout;
    private String userProfilePhoto;
    private String userName;
    private LocalDateTime userLastSeen;
    private boolean isUserDisabled;

    @OneToMany(mappedBy = "userEntity",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Set<ConversationEntity> conversationEntitySet;

    @OneToMany(mappedBy = "userEntity",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Set<GroupUserEntity> groupUserEntitySet;



}
