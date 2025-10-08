package com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestDTO {

    private String clientId;
    private String token;
}
