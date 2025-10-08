package com.userbankdetails.EliteBank_UserBankMicroservice.Account.Service;

import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Model.AccountEntity;

public interface AccountEntityService {

    public AccountEntity createAccount(AccountEntity accountData);
    public AccountEntity getAccountData(String user_id);

    public AccountEntity updateData(AccountEntity accountdata);

    public void updateAmount(String amount,String account_number);
}
