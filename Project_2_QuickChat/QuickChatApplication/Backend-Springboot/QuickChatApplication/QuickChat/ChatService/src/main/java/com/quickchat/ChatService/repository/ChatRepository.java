package com.quickchat.ChatService.repository;

import com.quickchat.CommonService.entity.ChatsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<ChatsEntity,String> {
}