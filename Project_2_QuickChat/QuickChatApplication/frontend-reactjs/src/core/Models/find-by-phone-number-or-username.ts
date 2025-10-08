export interface FindUserByPhoneNumberOrUserNameResponse{
    id:string;
    userEmail:string;
    userPhoneNumber:string;
    userAbout:string;
    userProfilePhoto:string;
    userName:string;
    userLastSeen:Date;
    isUserDisabled:boolean;
}

export interface FetchParticularUserDataRequest{
    userID:string;
    searchingUserID:string;
}