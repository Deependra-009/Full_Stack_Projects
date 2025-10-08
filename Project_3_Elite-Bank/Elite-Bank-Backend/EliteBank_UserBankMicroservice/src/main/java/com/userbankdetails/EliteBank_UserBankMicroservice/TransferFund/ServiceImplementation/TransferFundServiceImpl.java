package com.userbankdetails.EliteBank_UserBankMicroservice.TransferFund.ServiceImplementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Model.AccountEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.Account.ServiceImplementation.AccountEntityServiceImpl;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Model.StatementEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.ServiceImplementation.StatementEntityServiceImpl;
import com.userbankdetails.EliteBank_UserBankMicroservice.TransferFund.Model.TransferFundEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.TransferFund.Service.TransferFundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class TransferFundServiceImpl implements TransferFundService {

    @Autowired
    private StatementEntityServiceImpl statementEntityService;

    @Autowired
    private AccountEntityServiceImpl accountEntityService;
    @Override
    public TransferFundEntity transferMoney(TransferFundEntity transferdata) {
        System.out.println(transferdata);
        if(transferdata.getIfsc_code()==null){
            same_account_transfer(transferdata);
        }
        else{
            diffenent_account_transfer(transferdata);
        }




        return transferdata;
    }

    private void same_account_transfer(TransferFundEntity transferdata)  {

        try{
            AccountEntity sender=this.accountEntityService.getAccountData(transferdata.getFromAccountNo());
            AccountEntity reciever=this.accountEntityService.getAccountData(transferdata.getToAccountNo());
            double transfermoney=Double.parseDouble(transferdata.getAmount());
            double sendermoney=Double.parseDouble(sender.getAccount_balance());
            double recievermoney=Double.parseDouble(reciever.getAccount_balance());
            if(sendermoney>=transfermoney){
                sendermoney-=transfermoney;
                recievermoney+=transfermoney;
            }
            else{
                throw new Exception("Insufficient Balance");//(500)
            }
            sender.setAccount_balance(String.valueOf(sendermoney));
            reciever.setAccount_balance(String.valueOf(recievermoney));

            createStatement(transferdata,sendermoney,recievermoney);

            this.accountEntityService.updateData(sender);
            this.accountEntityService.updateData(reciever);
        }
        catch(Exception e){
            e.printStackTrace();
        }



    }

    private void diffenent_account_transfer(TransferFundEntity transferdata){
        System.out.println(transferdata);
        AccountEntity sender=this.accountEntityService.getAccountData(transferdata.getFromAccountNo());
//        AccountEntity reciever=this.accountEntityService.getAccountData(transferdata.getToAccountNo());
        double transfermoney=Double.parseDouble(transferdata.getAmount());
        double sendermoney=Double.parseDouble(sender.getAccount_balance());
//        double recievermoney=Double.parseDouble(reciever.getAccount_balance());
        if(sendermoney>=transfermoney){
            sendermoney-=transfermoney;
//            recievermoney+=transfermoney;
        }
        sender.setAccount_balance(String.valueOf(sendermoney));
//        reciever.setAccount_balance(String.valueOf(recievermoney));

        createStatement(transferdata,sendermoney,null);

        this.accountEntityService.updateData(sender);
//        this.accountEntityService.updateData(reciever);
    }


    public void createStatement(TransferFundEntity statement,double senderMoney,Double recieverMoney) {

        LocalDate date=LocalDate.now();
        LocalDateTime dt=LocalDateTime.now();
        System.out.println(dt);

        StatementEntity senderStatement=StatementEntity
                .builder()
                .expense_type(statement.getExpenseType())
                .account_number(statement.getFromAccountNo())
                .transfer_account_number(statement.getToAccountNo())
                .transaction_date(date)
                .transaction_date_time(dt)
                .description(statement.getDescription())
                .amount(statement.getAmount())
                .type("debit")
                .balance(String.valueOf(senderMoney))
                .refNo(generateReferenceNumber())
                .build();

        if(recieverMoney!=null){
            StatementEntity recieverStatement=StatementEntity
                    .builder()
                    .expense_type("null")
                    .account_number(statement.getToAccountNo())
                    .transfer_account_number(statement.getFromAccountNo())
                    .transaction_date(date)
                    .transaction_date_time(dt)
                    .description(statement.getDescription())
                    .amount(statement.getAmount())
                    .type("credit")
                    .balance(String.valueOf(recieverMoney))
                    .refNo(generateReferenceNumber())
                    .build();
            this.statementEntityService.addStatementData(recieverStatement);
        }

        this.statementEntityService.addStatementData(senderStatement);






    }

    private String generateReferenceNumber() {
        final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        final int REFERENCE_NUMBER_LENGTH = 10;
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(REFERENCE_NUMBER_LENGTH);

        for (int i = 0; i < REFERENCE_NUMBER_LENGTH; i++) {
            int randomIndex = random.nextInt(ALPHABET.length());
            char randomChar = ALPHABET.charAt(randomIndex);
            sb.append(randomChar);
        }

        return sb.toString();
    }
}
