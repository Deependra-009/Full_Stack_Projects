export const Wish_LIST_REQUEST="Wish list request";
export const Wish_LIST_SUCCESS="Wish list success";
export const Wish_LIST_ERROR="Wish list error";


export class WishListRequestAction{
    readonly type=Wish_LIST_REQUEST;
}


export class WishListSucessAction{
    readonly type=Wish_LIST_SUCCESS;

    constructor(public payload?:{WishData:[]}){

    }
}

export class WishListErrorAction{
    readonly type=Wish_LIST_ERROR;
}
 