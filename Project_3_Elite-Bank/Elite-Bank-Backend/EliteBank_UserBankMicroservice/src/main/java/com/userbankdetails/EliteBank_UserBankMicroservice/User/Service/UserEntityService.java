package com.userbankdetails.EliteBank_UserBankMicroservice.User.Service;

import com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO.RegisterResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Model.UserEntity;

import java.util.List;

public interface UserEntityService {

    public UserEntity addUserData(UserEntity userdata);
    public List<UserEntity> getAllUserData();
    public RegisterResponseDTO getParticularUserData(String user_id);

    public UserEntity updateProfile(UserEntity data);


}
