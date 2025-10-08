import { CHAT_API, USER_API } from "../constant/URL";
import { FetchParticularUserDataRequest } from "../Models/find-by-phone-number-or-username";
import { CreateGroupRequest } from "../Models/group.model";
import { UpdateMessageRequest } from "../Models/update-message-model";
import { UserLoginRequest, UserProfileRequest } from "../Models/user-login.model";
import axios from 'axios';


export const loginUserRepository=(payload:UserLoginRequest)=>{
    return axios.post(`${USER_API}/login`, payload);
}

export const fetchUserProfileRepository=(payload:UserProfileRequest)=>{
    return axios.post(`${USER_API}/getUserData`, payload);
}

export const findUserByPhoneNumberOrUserNameRepository=(payload:string)=>{
    return axios.get(`${USER_API}/findUserByPhoneNumberOrUserName/${payload}`);
}

export const fetchUserDataRepository=(payload:FetchParticularUserDataRequest)=>{
    return axios.post(`${USER_API}/findUserData`, payload);
}

export const updateReadMessageStatusRepository=(payload:UpdateMessageRequest)=>{
    return axios.post(`${CHAT_API}/updateMessageReadStatus`,payload);
}

export const createGroupRepository=(payload:CreateGroupRequest)=>{
    return axios.post(`${USER_API}/createGroup`,payload);
}