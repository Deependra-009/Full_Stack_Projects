package com.quickchat.ChatService.websocket.core;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;

@Component
public class UserHandshakeInterceptor implements HandshakeInterceptor {



    @Override
    public boolean beforeHandshake(ServerHttpRequest request,
                                   ServerHttpResponse response,
                                   WebSocketHandler wsHandler,
                                   Map<String, Object> attributes) {
        // Extracting query parameters from the URI
        System.out.println(request.getURI());
        URI uri = request.getURI();
        String userId = UriComponentsBuilder.fromUri(uri).build().getQueryParams().getFirst("userId");

        if (userId != null) {
            attributes.put("userId", userId);
        } else {
            System.out.println("No user ID found in request.");
        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}

