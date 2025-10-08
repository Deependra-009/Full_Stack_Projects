package com.productmicroservice;

import java.util.concurrent.Executor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.cache.annotation.EnableCaching;
//import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
//import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
@SpringBootApplication
//@EnableEurekaClient
@EnableAsync(proxyTargetClass=true)
@EnableCaching

public class UrbanIndieProductMicroservicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(UrbanIndieProductMicroservicesApplication.class, args);
	}
	
	@Bean("AsyncExecuter")
	public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(7);
        executor.setMaxPoolSize(42);
        executor.setQueueCapacity(11);
        executor.setThreadNamePrefix("MyExecutor-");
        executor.initialize();
        return executor;
    }
}
