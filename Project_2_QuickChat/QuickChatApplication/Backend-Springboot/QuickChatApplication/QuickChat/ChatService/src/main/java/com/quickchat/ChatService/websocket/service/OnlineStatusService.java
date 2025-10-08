package com.quickchat.ChatService.websocket.service;

import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OnlineStatusService {

    private static final OnlineStatusService onlineStatusService=new OnlineStatusService();

    private static final ConcurrentHashMap<String, Boolean> onlineUsers = new ConcurrentHashMap<>();

    public static OnlineStatusService getOnlineStatusServiceInstance(){
        return onlineStatusService;
    }
    private OnlineStatusService(){

    }

    public void setUserOnline(String userId) {
        onlineUsers.put(userId, true);
    }

    public void setUserOffline(String userId) {
        onlineUsers.remove(userId);
    }

    public boolean isUserOnline(String userId) {
        return onlineUsers.containsKey(userId);
    }
}

