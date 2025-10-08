
export const BENEFICIARY_DETAILS_REQUEST="beneficiary details request";
export const BENEFICIARY_DETAILS_SUCCESS="beneficiary details success";
export const BENEFICIARY_DETAILS_ERROR="beneficiary details error";

export class BeneficiaryDetailsRequestAction{
    readonly type=BENEFICIARY_DETAILS_REQUEST;
}

export class BeneficiaryDetailsSuccessAction{
    readonly type=BENEFICIARY_DETAILS_SUCCESS;
    constructor(public payload?:{BeneficiaryData:any}){

    }
}

export class BeneficiaryDetailsErrorAction{
    readonly type=BENEFICIARY_DETAILS_ERROR;
}
