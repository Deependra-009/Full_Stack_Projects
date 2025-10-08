
export const CARD_DETAILS_REQUEST="card data details request";
export const CARD_DETAILS_SUCCESS="card data details success";
export const CARD_DETAILS_ERROR="card data details error";

export class CardDetailsRequestAction{
    readonly type=CARD_DETAILS_REQUEST;
}

export class CardDetailsSuccessAction{
    readonly type=CARD_DETAILS_SUCCESS;
    constructor(public payload?:{CardData:{}}){

    }
}

export class CardDetailsErrorAction{
    readonly type=CARD_DETAILS_ERROR;
}
