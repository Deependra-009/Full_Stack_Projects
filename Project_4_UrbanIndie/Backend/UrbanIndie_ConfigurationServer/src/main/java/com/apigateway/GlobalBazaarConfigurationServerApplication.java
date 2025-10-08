package com.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.context.annotation.Bean;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@SpringBootApplication
@EnableConfigServer
public class GlobalBazaarConfigurationServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(GlobalBazaarConfigurationServerApplication.class, args);
	}
	
	

}
