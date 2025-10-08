package com.quickchat.ChatService.repository;

import com.quickchat.CommonService.entity.MessageEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity,String> {

    @Query("SELECT m FROM MessageEntity m WHERE m.chatID=:chatID")
    public List<MessageEntity> getAllMessageParticularUserFromDB(
            @Param("chatID") String chatID
    );

    @Modifying
    @Transactional
    @Query("UPDATE MessageEntity m SET " +
            "m.messageSeenAt=:messageSeenAt " +
            "WHERE m.messageSeenAt IS NULL AND " +
            "m.chatID=:chatID")
    public void updateReadMessageStatus(
            @Param("chatID") String chatID,
            @Param("messageSeenAt") LocalDateTime messageSeenAt
            );

    @Modifying
    @Transactional
    @Query("UPDATE MessageEntity m SET " +
            "m.messageDeliverableAt=:messageDeliverableAt " +
            "WHERE m.messageDeliverableAt IS NULL AND " +
            "m.chatID=:chatID")
    public void updateDeliverableMessageStatus(
            @Param("chatID") String chatID,
            @Param("messageDeliverableAt") LocalDateTime messageDeliverableAt
    );

}
