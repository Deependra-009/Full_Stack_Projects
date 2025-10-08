package com.backend.AuthenticationMicroservice.ServiceImplementation;

import com.backend.AuthenticationMicroservice.Model.UserEntity;
import com.backend.AuthenticationMicroservice.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation {

    @Autowired
    private UserRepository userRepository;


    public UserEntity getUserById(UserEntity userEntity){
        UserEntity user=this.userRepository.isUserExist(userEntity.getUser_id());
        if(user==null){
            user=this.userRepository.save(userEntity);
        }
        return user;
    }

    public UserEntity isUserIdExist(String userId){
        return this.userRepository.isUserExist(userId);
    }

    public UserEntity updateUserData(UserEntity userEntity){
        return this.userRepository.save(userEntity);
    }

    public UserEntity getUserData(String userId){
        UserEntity user=this.userRepository.isUserExist(userId);
        return user;
    }


}
