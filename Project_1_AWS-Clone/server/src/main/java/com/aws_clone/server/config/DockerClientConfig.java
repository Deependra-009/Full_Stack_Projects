package com.aws_clone.server.config;


import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.core.DockerClientBuilder;
import com.github.dockerjava.okhttp.OkHttpDockerCmdExecFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DockerClientConfig {

    @Bean
    public DockerClient dockerClient() {
        return DockerClientBuilder.getInstance()
                .withDockerCmdExecFactory(new OkHttpDockerCmdExecFactory())
                .build();
    }
}
