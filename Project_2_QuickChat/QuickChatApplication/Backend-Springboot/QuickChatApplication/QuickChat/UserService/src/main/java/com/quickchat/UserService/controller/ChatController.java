package com.quickchat.UserService.controller;

import com.quickchat.ChatService.service.Interface.ChatService;
import com.quickchat.ChatService.websocket.service.OnlineStatusService;
import com.quickchat.CommonService.Enum.ConversationType;
import com.quickchat.CommonService.exception.CustomException;
import com.quickchat.CommonService.request.CreateGroupRequest;
import com.quickchat.CommonService.request.MessageRequest;
import com.quickchat.CommonService.request.UpdateMessageRequest;
import com.quickchat.CommonService.response.GroupResponse;
import com.quickchat.CommonService.response.MessageResponse;
import com.quickchat.CommonService.response.UpdateMessageResponse;
import com.quickchat.CommonService.response.UserProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    OnlineStatusService onlineStatusService;


    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/update-message")
    public void readMessage(@Payload UpdateMessageRequest updateMessageRequest){
        System.out.println("UPDATE0 "+updateMessageRequest);
        UpdateMessageResponse messageResponse=this.chatService.updateMessageResponse(updateMessageRequest);
        if(messageResponse!=null){
            messageResponse.setUpdateMessageType(updateMessageRequest.getUpdateMessageType());
            messagingTemplate.convertAndSendToUser(
                    updateMessageRequest.getReceiverID(),
                    "/queue/update-message",
                    messageResponse
            );
            messagingTemplate.convertAndSendToUser(
                    updateMessageRequest.getSenderID(),
                    "/queue/update-message",
                    messageResponse
            );
        }
        else{
            throw new CustomException("Unable to send message","BAD_REQUEST");
        }
    }

    @MessageMapping("/send-message")
    public void sendMessage(@Payload MessageRequest messageRequest) {
        // Send message to the recipient's specific topic
        System.out.println("request: "+ messageRequest);
        MessageResponse messageResponse=this.chatService.sendMessage(messageRequest);
        System.out.println("response "+ messageResponse);
        if(messageRequest.getConversationType()== ConversationType.ONE_TO_ONE_CONVERSATION){
            messagingTemplate.convertAndSendToUser(
                    messageRequest.getReceiverID(),
                    "/queue/receive-message",
                    messageResponse
            );
        }

        messagingTemplate.convertAndSendToUser(
                messageRequest.getSenderID(),
                "/queue/receive-message",
                messageResponse
        );
    }

    @MessageMapping("/send-group-message")
    public void sendGroupMessage(@Payload MessageResponse messageResponse) {
        // Send message to the recipient's specific topic

        System.out.println("message group "+messageResponse);

        messagingTemplate.convertAndSendToUser(
                messageResponse.getReceiverID(),
                "/queue/send-particular-message",
                messageResponse
        );
    }

    @MessageMapping("/create-group")
    public void sendGroupNotification(@Payload GroupResponse groupResponse) {
        // Send message to the recipient's specific topic

        System.out.println("create group"+groupResponse);

        for(UserProfile user:groupResponse.getMembersList()){
            messagingTemplate.convertAndSendToUser(
                    user.getUserID(),
                    "/queue/create-group-notification",
                    groupResponse
            );
        }


    }


//    Temporary
    @PostMapping("/sendMessage")
    public MessageResponse send(@RequestBody MessageRequest messageRequest){
        return this.chatService.sendMessage(messageRequest);
    }

    @PostMapping("/updateMessageReadStatus")
    public UpdateMessageResponse updateSeenMessage(@RequestBody UpdateMessageRequest updateMessageRequest){
        return this.chatService.updateMessageResponse(updateMessageRequest);
    }





}
