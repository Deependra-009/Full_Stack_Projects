package com.quickchat.ChatService.websocket.core;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    private UserHandshakeInterceptor userHandshakeInterceptor;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        System.out.println("connect register stomp");
        registry
                .addEndpoint("/quick-chat-web-socket")
                .setAllowedOrigins("http://localhost:3000")
                .addInterceptors(userHandshakeInterceptor)
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        System.out.println("connect message broker");
        registry.enableSimpleBroker("/user","/topic","/groups");
        registry.setApplicationDestinationPrefixes("/api/v1/chat");
        registry.setUserDestinationPrefix("/user");
    }
}
