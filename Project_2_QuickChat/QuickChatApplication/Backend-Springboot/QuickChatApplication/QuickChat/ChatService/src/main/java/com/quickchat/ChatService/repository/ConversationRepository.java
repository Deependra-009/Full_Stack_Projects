package com.quickchat.ChatService.repository;

import com.quickchat.CommonService.entity.single.ConversationEntity;
import com.quickchat.CommonService.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ConversationRepository extends JpaRepository<ConversationEntity,String> {

    @Query("select u.chatID FROM ConversationEntity u " +
            "WHERE u.userEntity=:userEntity " +
            "AND " +
            "u.userReceiverID=:userReceiverID")
    public String getChatIDFromDB(
            @Param("userEntity") UserEntity userEntity,
            @Param("userReceiverID") String userReceiverID
    );
}
