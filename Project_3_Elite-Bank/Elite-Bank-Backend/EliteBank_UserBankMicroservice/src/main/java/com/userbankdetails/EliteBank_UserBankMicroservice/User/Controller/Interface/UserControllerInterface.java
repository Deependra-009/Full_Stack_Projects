package com.userbankdetails.EliteBank_UserBankMicroservice.User.Controller.Interface;

import com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO.LoginRequestDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO.LoginResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO.RegisterRequestDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO.RegisterResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Model.UserEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserControllerInterface {
    public UserEntity addData(RegisterRequestDTO userdata);
    public List<UserEntity> getAllUserData();
    public ResponseEntity<LoginResponseDTO> login(LoginRequestDTO loginRequestDTO);

    public UserEntity updateProfile(UserEntity userdata);


}
