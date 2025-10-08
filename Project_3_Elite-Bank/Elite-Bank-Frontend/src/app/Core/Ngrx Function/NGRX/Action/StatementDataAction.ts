
export const STATEMENT_DETAILS_REQUEST="STATEMENT details request";
export const STATEMENT_DETAILS_SUCCESS="STATEMENT details success";
export const STATEMENT_DETAILS_ERROR="STATEMENT details error";

export class StatementDetailsRequestAction{
    readonly type=STATEMENT_DETAILS_REQUEST;
}

export class StatementDetailsSuccessAction{
    readonly type=STATEMENT_DETAILS_SUCCESS;
    constructor(public payload?:{StatementData:any}){

    }
}


export class StatementDetailsErrorAction{
    readonly type=STATEMENT_DETAILS_ERROR;
}
