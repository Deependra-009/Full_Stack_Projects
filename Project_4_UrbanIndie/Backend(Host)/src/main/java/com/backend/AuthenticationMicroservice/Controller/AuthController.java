package com.backend.AuthenticationMicroservice.Controller;


import com.backend.AuthenticationMicroservice.DTO.RequestDTO;
import com.backend.AuthenticationMicroservice.DTO.ResponseDTO;
import com.backend.AuthenticationMicroservice.Model.UserEntity;
import com.backend.AuthenticationMicroservice.Security.GoogleIdTokenVerify;
import com.backend.AuthenticationMicroservice.ServiceImplementation.UserServiceImplementation;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private GoogleIdTokenVerify googleIdTokenVerify;

    @Autowired
    private UserServiceImplementation userServiceImplementation;


    @PostMapping("/login")
    public ResponseEntity<UserEntity> checkToken(@RequestBody RequestDTO requestDTO) throws GeneralSecurityException, IOException {

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

        GoogleIdToken googleIdToken=this.googleIdTokenVerify.authorize(requestDTO);
        if(googleIdToken!=null){
            GoogleIdToken.Payload payload   = googleIdToken.getPayload();
            String userId=payload.getSubject();

            UserEntity userEntity=this.userServiceImplementation.isUserIdExist(userId);

            if(userEntity!=null){
                return new ResponseEntity<ResponseDTO>(new ResponseDTO(userId,true),HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(new ResponseDTO(null,false),HttpStatus.UNAUTHORIZED);
    }



}
