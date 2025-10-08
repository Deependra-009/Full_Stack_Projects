package com.quickchat.CommonService.entity.single;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quickchat.CommonService.entity.ChatsEntity;
import com.quickchat.CommonService.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

@Table(
        name = "ConversationTable"
)
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConversationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String conversationID;
    private String userReceiverID;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinColumn(name = "userSenderID")
    private UserEntity userEntity;

    @Column(name = "chatID", insertable = false, updatable = false)
    private String chatID;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "chatID")
    @JsonIgnore
    private ChatsEntity chatsEntitySet;


}

