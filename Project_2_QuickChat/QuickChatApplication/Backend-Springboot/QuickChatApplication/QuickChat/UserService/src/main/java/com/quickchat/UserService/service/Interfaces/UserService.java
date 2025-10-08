package com.quickchat.UserService.service.Interfaces;

import com.google.firebase.auth.FirebaseAuthException;
import com.quickchat.CommonService.entity.UserEntity;
import com.quickchat.CommonService.entity.group.GroupEntity;
import com.quickchat.CommonService.request.CreateGroupRequest;
import com.quickchat.CommonService.response.ConversationResponse;
import com.quickchat.CommonService.response.GroupResponse;
import com.quickchat.CommonService.response.MessageDTO;
import com.quickchat.UserService.models.Request.FetchParticularUserDataRequest;
import com.quickchat.UserService.models.Request.UserLoginRequest;
import com.quickchat.UserService.models.Request.UserProfileRequest;
import com.quickchat.UserService.models.Request.UserRegisterRequest;
import com.quickchat.UserService.models.Response.FindUserByPhoneNumberOrUserNameResponse;
import com.quickchat.UserService.models.Response.UserLoginResponse;
import com.quickchat.UserService.models.Response.UserProfileResponse;
import com.quickchat.UserService.models.Response.UserRegisterResponse;

import java.util.List;

public interface UserService {

    public UserRegisterResponse addUserInDB(UserRegisterRequest userRegisterRequest);

    public UserLoginResponse getUserFromDB(UserLoginRequest userLoginRequest) throws FirebaseAuthException;

    public List<FindUserByPhoneNumberOrUserNameResponse> findUserByPhoneNumberOrUserNameResponse(String searchText);

    public UserProfileResponse getUserData(UserProfileRequest userProfileRequest);

    public ConversationResponse findUserData(FetchParticularUserDataRequest userProfileRequest);

    public GroupResponse createGroup(CreateGroupRequest createGroupRequest);
}
