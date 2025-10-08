package com.backend.AuthenticationMicroservice.Controller;

import com.backend.AuthenticationMicroservice.DTO.MessageDTO;
import com.backend.AuthenticationMicroservice.Model.UserEntity;
import com.backend.AuthenticationMicroservice.ServiceImplementation.UserServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins="*")
public class UserController {

    @Autowired
    private UserServiceImplementation userServiceImplementation;

    @PostMapping("/update")
    public ResponseEntity<MessageDTO> updateUserData(@RequestBody UserEntity userEntity){

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

        UserEntity userdata=this.userServiceImplementation.getUserData(userId);
        return new ResponseEntity<>(userdata,HttpStatus.OK);
    }



}
