package com.quickchat.UserService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.quickchat.UserService", "com.quickchat.ChatService", "com.quickchat.CommonService"})
@EntityScan(basePackages = {"com.quickchat.CommonService.entity"})
@EnableJpaRepositories(basePackages = {"com.quickchat.UserService.repository", "com.quickchat.ChatService.repository"})
public class UserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserServiceApplication.class, args);
	}

}
