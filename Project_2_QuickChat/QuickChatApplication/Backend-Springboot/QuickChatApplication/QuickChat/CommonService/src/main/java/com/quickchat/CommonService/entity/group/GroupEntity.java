package com.quickchat.CommonService.entity.group;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quickchat.CommonService.entity.ChatsEntity;
import com.quickchat.CommonService.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Table(name="GroupTable")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class GroupEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String groupID;
    private String adminUserID;
    private String groupName;
    private String groupImage;
    private String groupDescription;

    @Column(name = "chatID")
    private String chatID;




}
