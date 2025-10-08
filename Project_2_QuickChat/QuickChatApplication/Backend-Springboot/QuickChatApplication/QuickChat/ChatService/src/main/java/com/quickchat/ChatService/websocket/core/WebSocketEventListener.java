package com.quickchat.ChatService.websocket.core;

import com.quickchat.ChatService.websocket.service.OnlineStatusService;
import com.quickchat.CommonService.entity.OnlineStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;




    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        OnlineStatusService onlineStatusService=OnlineStatusService.getOnlineStatusServiceInstance();
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String userId = null;
        if (headerAccessor.getSessionAttributes() != null && headerAccessor.getSessionAttributes().get("userId") != null) {
            userId = headerAccessor.getSessionAttributes().get("userId").toString();
            onlineStatusService.setUserOnline(userId);
            // Broadcast user online status to all connected clients
            messagingTemplate.convertAndSend("/topic/status", new OnlineStatus(userId, true));


        }
        else {
            // Handle the case where userId is null (e.g., log an error, return early, etc.)
            System.out.println("User ID is null in the session attributes.");
            return;
        }

    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        OnlineStatusService onlineStatusService=OnlineStatusService.getOnlineStatusServiceInstance();
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String userId = null;
        if (headerAccessor.getSessionAttributes() != null && headerAccessor.getSessionAttributes().get("userId") != null) {
            userId = headerAccessor.getSessionAttributes().get("userId").toString();
            onlineStatusService.setUserOffline(userId);

            // Broadcast user offline status to all connected clients
            messagingTemplate.convertAndSend("/topic/status", new OnlineStatus(userId, false));
        }
        else {
            // Handle the case where userId is null (e.g., log an error, return early, etc.)
            System.out.println("User ID is null in the session attributes.");
            return;
        }

    }


}

