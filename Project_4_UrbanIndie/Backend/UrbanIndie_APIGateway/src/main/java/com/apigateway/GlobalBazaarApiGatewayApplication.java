package com.apigateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import com.apigateway.config.RedisHashComponent;
import com.apigateway.dto.APIKey;
import com.apigateway.util.AppConstants;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@SpringBootApplication
public class GlobalBazaarApiGatewayApplication {
	


    @Autowired
    private RedisHashComponent redisHashComponent;

    @PostConstruct
    public void initKeysToRedis() {
        List<APIKey> apiKeys = new ArrayList<>();
     
        List<String> ServicesList=new ArrayList<>();
        ServicesList.add(AppConstants.USER_SERVICE_KEY);
        ServicesList.add(AppConstants.PRODUCT_SERVICE_KEY);
        ServicesList.add(AppConstants.ORDER_CART_SERVICE_KEY);
        
        apiKeys.add(new APIKey("FA48-EF0C-427E-8CCF",ServicesList));
        
        
        
        System.out.println("->"+apiKeys);
        apiKeys.add(new APIKey("343C-ED0B-4137-B27E", Stream.of(AppConstants.PRODUCT_SERVICE_KEY)
                .collect(Collectors.toList())));
        List<Object> lists = redisHashComponent.hValues(AppConstants.RECORD_KEY);
        if (lists.isEmpty()) {
            apiKeys.forEach(k -> redisHashComponent.hSet(AppConstants.RECORD_KEY, k.getKey(), k));
        }
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(AppConstants.PRODUCT_SERVICE_KEY,
						r -> r.path("/api/product-service/**")
                        .filters(f -> f.stripPrefix(2)).uri("lb://PRODUCT-SERVICE"))
                .route(AppConstants.USER_SERVICE_KEY,
						r -> r.path("/api/user-service/**")
                        .filters(f -> f.stripPrefix(2)).uri("lb://USER-SERVICE"))
                .route(AppConstants.ORDER_CART_SERVICE_KEY,
						r -> r.path("/api/order-cart-service/**")
                        .filters(f -> f.stripPrefix(2)).uri("lb://ORDER-CART-SERVICE"))
                .build();
    }

    public static void main(String[] args) {
        SpringApplication.run(GlobalBazaarApiGatewayApplication.class, args);
    }
    
    

}