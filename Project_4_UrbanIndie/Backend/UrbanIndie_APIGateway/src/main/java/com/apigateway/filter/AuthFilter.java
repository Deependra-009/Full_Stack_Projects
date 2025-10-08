package com.apigateway.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.ServerWebExchange;

import com.apigateway.config.RedisHashComponent;
import com.apigateway.dto.APIKey;
import com.apigateway.dto.ValidatingDTO;
import com.apigateway.util.AppConstants;
import com.apigateway.util.MapperUtils;

import reactor.core.publisher.Mono;

import java.util.List;

@Component
@Slf4j
public class AuthFilter implements GlobalFilter , Ordered {
	

    @Autowired
    private RedisHashComponent redisHashComponent;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        List<String> apiKeyHeader=exchange.getRequest().getHeaders().get("gatewaykey");
        log.info("api key {} ",apiKeyHeader);
        System.out.println(apiKeyHeader);
        Route route=exchange.getAttribute(ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR);
        
        String routeId=route!=null? route.getId() : null;
        

        if(routeId ==null || CollectionUtils.isEmpty(apiKeyHeader) || !isAuthorize(routeId, apiKeyHeader.get(0))){
            
        	throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"you can't consume this service , Please validate your apikeys");
        }else {
        	
        	return chain.filter(exchange);
        }

    }

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }
    

    private boolean isAuthorize(String routeId,String apiKey){
        Object apiKeyObject=redisHashComponent.hGet(AppConstants.RECORD_KEY, apiKey);
        System.out.println(apiKeyObject+" "+routeId);
        if(apiKeyObject!=null){
            APIKey key= MapperUtils.objectMapper(apiKeyObject, APIKey.class);
            
            return key.getServices().contains(routeId);
        }else{
            return false;
        }
    }
    
   
}