package com.quickchat.ChatService.service.Implementation;


import com.quickchat.ChatService.repository.ChatRepository;
import com.quickchat.ChatService.repository.ConversationRepository;
import com.quickchat.ChatService.repository.MessageRepository;
import com.quickchat.ChatService.service.Interface.ChatService;
import com.quickchat.ChatService.websocket.service.OnlineStatusService;
import com.quickchat.CommonService.Enum.UpdateMessageType;
import com.quickchat.CommonService.entity.*;
import com.quickchat.CommonService.entity.ChatsEntity;
import com.quickchat.CommonService.entity.single.ConversationEntity;
import com.quickchat.CommonService.entity.MessageEntity;
import com.quickchat.CommonService.request.MessageRequest;
import com.quickchat.CommonService.request.UpdateMessageRequest;
import com.quickchat.CommonService.response.MessageResponse;
import com.quickchat.CommonService.response.UpdateMessageResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChatServiceImplementation implements ChatService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private OnlineStatusService onlineStatusService;

    @Transactional
    public MessageResponse sendMessage(MessageRequest messageRequest){
        System.out.println("==>>> "+messageRequest);
        String chatID=this.conversationRepository.getChatIDFromDB(
                entityManager.getReference(UserEntity.class,messageRequest.getSenderID()),
                messageRequest.getReceiverID()
        );
        if(messageRequest.getChatID()==null && chatID==null){
            ChatsEntity chatsEntity=this.chatRepository.save(new ChatsEntity());


            this.conversationRepository.save(ConversationEntity.builder()
                            .chatsEntitySet(chatsEntity)
                            .userReceiverID(messageRequest.getReceiverID())
                            .userEntity(entityManager.getReference(UserEntity.class,messageRequest.getSenderID()))
                            .build()
            );

            this.conversationRepository.save(ConversationEntity.builder()
                    .chatsEntitySet(chatsEntity)
                    .userReceiverID(messageRequest.getSenderID())
                    .userEntity(entityManager.getReference(UserEntity.class,messageRequest.getReceiverID()  ))
                    .build()
            );

            chatID=chatsEntity.getChatID();
        }
        else{
            chatID=messageRequest.getChatID();
        }


        MessageEntity messageEntity= this.messageRepository.save(MessageEntity.builder()
                .chatID(chatID)
                .conversationType(messageRequest.getConversationType())
                .messageContent(messageRequest.getMessageContent())
                .receiverID(messageRequest.getReceiverID())
                .messageDeliverableAt(onlineStatusService.isUserOnline(messageRequest.getReceiverID())?LocalDateTime.now():null)
                .messageSentAt(LocalDateTime.now())
                .messageDeliverableAt(messageRequest.isUserOnline()?LocalDateTime.now():null)
                .contentType(messageRequest.getContentType())
                .senderID(messageRequest.getSenderID())
                .build());




        return MessageResponse.builder()
                .senderID(messageRequest.getSenderID())
                .chatID(chatID)
                .messageID(messageEntity.getMessageID())
                .receiverID(messageEntity.getReceiverID())
                .contentType(messageRequest.getContentType())
                .messageContent(messageRequest.getMessageContent())
                .messageSentAt(messageEntity.getMessageSentAt())
                .conversationType(messageEntity.getConversationType())
                .messageDeliverableAt(messageEntity.getMessageDeliverableAt())
                .messageSeenAt(messageEntity.getMessageSeenAt())
                .build();
    }

    @Override
    public List<MessageResponse> getAllMessageParticularUser(String chatID) {
        List<MessageEntity> allMessages= this.messageRepository.getAllMessageParticularUserFromDB(chatID);

        List<MessageResponse> messageResponseList=new ArrayList<>();

        for(MessageEntity messageEntity:allMessages){
            MessageResponse messageResponse=MessageResponse.builder()
                    .messageID(messageEntity.getMessageID())
                    .messageContent(messageEntity.getMessageContent())
                    .chatID(chatID)
                    .messageSentAt(messageEntity.getMessageSentAt())
                    .messageSeenAt(messageEntity.getMessageSeenAt())
                    .messageDeliverableAt(messageEntity.getMessageDeliverableAt())
                    .contentType(messageEntity.getContentType())
                    .senderID(messageEntity.getSenderID())
                    .receiverID(messageEntity.getReceiverID())
                    .build();
            messageResponseList.add(messageResponse);
        }
        return messageResponseList;

    }

    @Override
    public UpdateMessageResponse updateMessageResponse(UpdateMessageRequest updateMessageRequest) {

        LocalDateTime localDateTime=LocalDateTime.now();
        if(updateMessageRequest.getUpdateMessageType()== UpdateMessageType.UPDATE_SEEN_DATE){
            this.messageRepository.updateReadMessageStatus(updateMessageRequest.getChatID() ,localDateTime);
            return UpdateMessageResponse.builder()
                    .chatID(updateMessageRequest.getChatID())
                    .readMessageDateTime(localDateTime)
                    .updateMessageType(updateMessageRequest.getUpdateMessageType())
                    .build();
        }
        else if(updateMessageRequest.getUpdateMessageType()==UpdateMessageType.UPDATE_DELIVERABLE_DATE){
            this.messageRepository.updateDeliverableMessageStatus(updateMessageRequest.getChatID() ,localDateTime);
            return UpdateMessageResponse.builder()
                    .chatID(updateMessageRequest.getChatID())
                    .readMessageDateTime(localDateTime)
                    .updateMessageType(updateMessageRequest.getUpdateMessageType())
                    .build();
        }
        else{
            this.messageRepository.updateReadMessageStatus(updateMessageRequest.getChatID() ,localDateTime);
            this.messageRepository.updateDeliverableMessageStatus(updateMessageRequest.getChatID() ,localDateTime);
            return UpdateMessageResponse.builder()
                    .chatID(updateMessageRequest.getChatID())
                    .readMessageDateTime(localDateTime)
                    .updateMessageType(updateMessageRequest.getUpdateMessageType())
                    .build();
        }
    }
}

