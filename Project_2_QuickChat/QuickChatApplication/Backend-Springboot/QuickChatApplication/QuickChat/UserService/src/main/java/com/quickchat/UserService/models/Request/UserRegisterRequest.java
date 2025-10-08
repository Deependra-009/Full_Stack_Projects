package com.quickchat.UserService.models.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequest {

    public String userEmail;
    public String userPassword;
    public String userName;

}