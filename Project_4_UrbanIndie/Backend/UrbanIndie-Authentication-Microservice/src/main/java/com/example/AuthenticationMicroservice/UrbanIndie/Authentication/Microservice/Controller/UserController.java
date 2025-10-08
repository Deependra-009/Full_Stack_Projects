package com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.Controller;

import com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.DTO.MessageDTO;
import com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.Model.UserEntity;
import com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.ServiceImplementation.UserServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    @PostMapping("/update")
    public ResponseEntity<MessageDTO> updateUserData(@RequestBody UserEntity userEntity){
        System.out.println(userEntity);
        try{
            this.userServiceImplementation.updateUserData(userEntity);
        }
        catch(Exception e){
            System.out.println(e);
        }

        return new ResponseEntity<>(new MessageDTO("Successfully Updated"), HttpStatus.OK);
    }

    @GetMapping("/get-user-data/{user-id}")
    public ResponseEntity<UserEntity> getUserData(@PathVariable("user-id") String userId){
        System.out.println(userId);
        UserEntity userdata=this.userServiceImplementation.getUserData(userId);
        return new ResponseEntity<>(userdata,HttpStatus.OK);
    }



}
