
export const MANAGE_FAVOURITE_DETAILS_REQUEST="ManageFavourite details request";
export const MANAGE_FAVOURITE_DETAILS_SUCCESS="ManageFavourite details success";
export const MANAGE_FAVOURITE_DETAILS_ERROR="ManageFavourite details error";

export class ManageFavouriteDetailsRequestAction{
    readonly type=MANAGE_FAVOURITE_DETAILS_REQUEST;
}

export class ManageFavouriteDetailsSuccessAction{
    readonly type=MANAGE_FAVOURITE_DETAILS_SUCCESS;
    constructor(public payload?:{ManageFavouriteData:any}){

    }
}


export class ManageFavouriteDetailsErrorAction{
    readonly type=MANAGE_FAVOURITE_DETAILS_ERROR;
}
