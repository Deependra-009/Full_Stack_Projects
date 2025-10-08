package com.userbankdetails.EliteBank_UserBankMicroservice.Account.ServiceImplementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Model.AccountEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Repository.AccountEntityRepo;
import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Service.AccountEntityService;
import com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.ServiceImplementation.LoanAccountServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountEntityServiceImpl implements AccountEntityService {

    @Autowired
    private AccountEntityRepo accountEntityRepo;



    @Override
    public AccountEntity createAccount(AccountEntity accountData) {
        return this.accountEntityRepo.save(accountData);
    }

    @Override
    public AccountEntity getAccountData(String user_id) {
        AccountEntity accountEntity= this.accountEntityRepo.getDataOfAccountNo(user_id);

        return accountEntity;
    }

    @Override
    public AccountEntity updateData(AccountEntity accountdata) {
        return this.accountEntityRepo.save(accountdata);
    }

    @Override
    public void updateAmount(String amount,String account_number) {
        double currentamount=Double.parseDouble(this.accountEntityRepo.getCurrentAccountBalance(account_number));
        double totalAmount=currentamount-Double.parseDouble(amount);
        this.accountEntityRepo.updateAccountBalance(""+totalAmount,account_number);
    }

    public Boolean checkAccounts(String account_number,String IFSC_Code ,boolean same_bank){
        int count=this.accountEntityRepo.ifExistData(account_number,IFSC_Code,same_bank);
        return count!=0;
    }




}
