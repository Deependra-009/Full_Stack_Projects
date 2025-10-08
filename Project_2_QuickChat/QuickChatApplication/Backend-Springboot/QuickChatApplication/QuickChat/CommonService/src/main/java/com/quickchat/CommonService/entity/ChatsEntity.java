package com.quickchat.CommonService.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quickchat.CommonService.entity.group.GroupEntity;
import com.quickchat.CommonService.entity.single.ConversationEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Table(name="ChatsTable")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ChatsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String chatID;


    @OneToMany(mappedBy = "chatsEntitySet",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<ConversationEntity> conversationEntity;
}

