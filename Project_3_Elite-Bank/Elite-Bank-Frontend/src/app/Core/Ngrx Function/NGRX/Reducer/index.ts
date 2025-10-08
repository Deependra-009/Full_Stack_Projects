import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as fromUser from './UserDetailsReducer'
import * as fromStatement from './StatementDataReducer'
import * as fromBeneficiary from './BeneficiaryDataReducer';
import * as fromManageFavourite from './ManageFavouriteReducer';
import * as fromCardData from './CardDataReducer';


export interface RootReducerState{
    userdetails:fromUser.UserDetailsReducerState;
    statementdetails:fromStatement.StatementDetailsReducerState,
    beneficiarydetails:fromBeneficiary.BeneficiaryDetailsReducerState,
    managefavourite:fromManageFavourite.ManageFavouriteDetailsReducerState,
    fromCardData:fromCardData.CardDetailsReducerState
}

export const rootReducer:ActionReducerMap<RootReducerState>={
    userdetails:fromUser.UserDetailsReducer,
    statementdetails:fromStatement.StatementDetailsReducer,
    beneficiarydetails:fromBeneficiary.BeneficiaryDetailsReducer,
    managefavourite:fromManageFavourite.ManageFavouriteDetailsReducer,
    fromCardData:fromCardData.CardDetailsReducer
}

// ------------ User Data -------------------

export const getUserState=(state:RootReducerState)=>state.userdetails;

export const getUserLoaded=createSelector(getUserState,fromUser.getLoaded);
export const getUserLoading=createSelector(getUserState,fromUser.getLoading);
export const getUserData=createSelector(getUserState,fromUser.getUserData);
export const getUserError=createSelector(getUserState,fromUser.getError);

// ---------------- Statement Data -------------------

export const getStatementState=(state:RootReducerState)=>state.statementdetails;

export const getStatementLoaded=createSelector(getStatementState,fromStatement.getLoaded);
export const getStatementLoading=createSelector(getStatementState,fromStatement.getLoading);
export const getStatementData=createSelector(getStatementState,fromStatement.getStatementData);
export const getStatementError=createSelector(getStatementState,fromStatement.getError);

// ---------------- Beneficiary Data -------------------

export const getBeneficiaryState=(state:RootReducerState)=>state.beneficiarydetails;

export const getBeneficiaryLoaded=createSelector(getBeneficiaryState,fromBeneficiary.getLoaded);
export const getBeneficiaryLoading=createSelector(getBeneficiaryState,fromBeneficiary.getLoading);
export const getBeneficiaryData=createSelector(getBeneficiaryState,fromBeneficiary.getBeneficiaryData);
export const getBeneficiaryError=createSelector(getBeneficiaryState,fromBeneficiary.getError);


// ---------------- Manage Favourite Data -------------------

export const getManageFavouriteState=(state:RootReducerState)=>state.managefavourite;

export const getManageFavouriteLoaded=createSelector(getManageFavouriteState,fromManageFavourite.getLoaded);
export const getManageFavouriteLoading=createSelector(getManageFavouriteState,fromManageFavourite.getLoading);
export const getManageFavouriteData=createSelector(getManageFavouriteState,fromManageFavourite.getManageFavouriteData);
export const getManageFavouriteError=createSelector(getManageFavouriteState,fromManageFavourite.getError);


// ----------------Card Data -------------------

export const getCardState=(state:RootReducerState)=>state.fromCardData;

export const getCardLoaded=createSelector(getCardState,fromCardData.getLoaded);
export const getCardLoading=createSelector(getCardState,fromCardData.getLoading);
export const getCardData=createSelector(getCardState,fromCardData.getCardData);
export const getCardError=createSelector(getCardState,fromCardData.getError);








