package com.quickchat.ChatService.service.Interface;

import com.quickchat.CommonService.request.MessageRequest;
import com.quickchat.CommonService.request.UpdateMessageRequest;
import com.quickchat.CommonService.response.MessageResponse;
import com.quickchat.CommonService.response.UpdateMessageResponse;

import java.util.List;

public interface ChatService {
    public MessageResponse sendMessage(MessageRequest messageRequest);

    public List<MessageResponse> getAllMessageParticularUser(String chatID);

    public UpdateMessageResponse updateMessageResponse(UpdateMessageRequest updateMessageRequest);

}

