export interface UserRegisterRequest{
    userEmail:string;
    userPhoneNumber:string;
    userName:string;
}

export interface UserRegisterResponse{
    userID:string;
    userEmail:string;
    userPhoneNumber:string;
    userName:string;
    userPhotoURL:string;
    isUserDisabled:boolean;
}