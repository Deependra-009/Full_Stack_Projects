
export const USER_DETAILS_REQUEST="user details request";
export const USER_DETAILS_SUCCESS="user details success";
export const USER_DETAILS_ERROR="user details error";

export class UserDetailsRequestAction{
    readonly type=USER_DETAILS_REQUEST;
}

export class UserDetailsSuccessAction{
    readonly type=USER_DETAILS_SUCCESS;
    constructor(public payload?:{UserData:any}){

    }
}


export class UserDetailsErrorAction{
    readonly type=UserDetailsErrorAction;
}
