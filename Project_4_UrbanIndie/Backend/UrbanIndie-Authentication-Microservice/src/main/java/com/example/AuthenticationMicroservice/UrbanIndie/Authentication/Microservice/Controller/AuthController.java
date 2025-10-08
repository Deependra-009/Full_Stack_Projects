package com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.Controller;

import com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.DTO.RequestDTO;
import com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.DTO.ResponseDTO;

//import com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.Service.GoogleIdTokenVerifier;
import com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.Model.UserEntity;
import com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.Security.GoogleIdTokenVerify;
import com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.ServiceImplementation.UserServiceImplementation;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Principal;
import java.util.Collections;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private GoogleIdTokenVerify googleIdTokenVerify;

    @Autowired
    private UserServiceImplementation userServiceImplementation;


    @PostMapping("/login")
    public ResponseEntity<UserEntity> checkToken(@RequestBody RequestDTO requestDTO) throws GeneralSecurityException, IOException {

        System.out.println(requestDTO.getToken());
        GoogleIdToken googleIdToken=this.googleIdTokenVerify.authorize(requestDTO);
        if(googleIdToken!=null){
            GoogleIdToken.Payload payload = googleIdToken.getPayload();
            UserEntity user=UserEntity.builder()
                    .user_id(payload.getSubject())
                    .name((String)payload.get("given_name"))
                    .email(payload.getEmail())
                    .date_of_birth("")
                    .gender("")
                    .phone_number("")
                    .picture_url((String) payload.get("picture"))
                    .build();

            UserEntity userEntity=this.userServiceImplementation.getUserById(user);
            return new ResponseEntity<UserEntity>(userEntity,HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/authorize")
    public ResponseEntity<ResponseDTO> authorize(@RequestHeader("Authorization") String authorization, @RequestBody RequestDTO requestDTO){
        System.out.println(authorization);
        GoogleIdToken googleIdToken=this.googleIdTokenVerify.authorize(requestDTO);
        if(googleIdToken!=null){
            GoogleIdToken.Payload payload = googleIdToken.getPayload();
            String userId=payload.getSubject();
            System.out.println(userId);
            UserEntity userEntity=this.userServiceImplementation.isUserIdExist(userId);
            System.out.println(userEntity);
            if(userEntity!=null){
                return new ResponseEntity<ResponseDTO>(new ResponseDTO(userId,true),HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(new ResponseDTO(null,false),HttpStatus.UNAUTHORIZED);
    }



}
