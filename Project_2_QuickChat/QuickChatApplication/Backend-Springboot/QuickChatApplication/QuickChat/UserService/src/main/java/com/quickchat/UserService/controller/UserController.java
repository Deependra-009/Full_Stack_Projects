package com.quickchat.UserService.controller;


import com.google.firebase.auth.FirebaseAuthException;
import com.quickchat.ChatService.websocket.service.OnlineStatusService;
import com.quickchat.CommonService.entity.UserEntity;
import com.quickchat.CommonService.entity.group.GroupEntity;
import com.quickchat.CommonService.request.CreateGroupRequest;
import com.quickchat.CommonService.response.ConversationResponse;
import com.quickchat.CommonService.response.GroupResponse;
import com.quickchat.UserService.models.Request.FetchParticularUserDataRequest;
import com.quickchat.UserService.models.Request.UserProfileRequest;
import com.quickchat.UserService.models.Response.UserProfileResponse;
import com.quickchat.UserService.service.Interfaces.UserService;
import com.quickchat.UserService.models.Request.UserLoginRequest;
import com.quickchat.UserService.models.Request.UserRegisterRequest;
import com.quickchat.UserService.models.Response.FindUserByPhoneNumberOrUserNameResponse;
import com.quickchat.UserService.models.Response.UserLoginResponse;
import com.quickchat.UserService.models.Response.UserRegisterResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private OnlineStatusService onlineStatusService;

    @PostMapping("/register")
    public UserRegisterResponse registerUser(@RequestBody UserRegisterRequest userRegisterRequest){

        return this.userService.addUserInDB(userRegisterRequest);

    }

    @GetMapping("/test")
    public String test(){
        return "hello";
    }

    @PostMapping("/login")
    public UserLoginResponse login(@RequestBody UserLoginRequest userLoginRequest) throws FirebaseAuthException {
        return this.userService.getUserFromDB(userLoginRequest);
    }

    @PostMapping("/getUserData")
    public UserProfileResponse getProfileData(@RequestBody UserProfileRequest userProfileRequest){
        return this.userService.getUserData(userProfileRequest);
    }

    @PostMapping("/findUserData")
    public ConversationResponse fetchUserData(@RequestBody FetchParticularUserDataRequest userProfileRequest){
        return this.userService.findUserData(userProfileRequest);
    }



    @GetMapping("/findUserByPhoneNumberOrUserName/{searchText}")
    public List<FindUserByPhoneNumberOrUserNameResponse> findUserByPhoneNumberOrUserNameResponse(@PathVariable("searchText") String searchText){
        return this.userService.findUserByPhoneNumberOrUserNameResponse(searchText);
    }

    @PostMapping("/createGroup")
    public GroupResponse createGroup(@RequestBody CreateGroupRequest groupRequestData){
        System.out.println("-->"+groupRequestData);
        return this.userService.createGroup(groupRequestData);
    }

    @GetMapping("/user/status")
    public boolean isUserOnline(@RequestParam String userId) {
        return onlineStatusService.isUserOnline(userId);
    }

}

