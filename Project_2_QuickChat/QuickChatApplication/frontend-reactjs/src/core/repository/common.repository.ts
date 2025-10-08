import { CHAT_API, USER_API } from "../../URL";
import { FetchParticularUserDataRequest } from "../Models/find-by-phone-number-or-username";
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