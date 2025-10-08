package com.userbankdetails.EliteBank_UserBankMicroservice.User.ServiceImplementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.ExceptionHandler.CustomException;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Model.UserEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Repository.UserEntityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserEntityRepo userRepository;
    @Override
    public UserEntity loadUserByUsername(String email) throws UsernameNotFoundException {

        UserEntity user=this.userRepository.findUserByMail(email).orElseThrow(()-> new CustomException("User Not Found",""+(HttpStatus.NOT_FOUND)));


        return user;
    }
}