package com.userbankdetails.EliteBank_UserBankMicroservice.Statement.ServiceImplementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Repository.AccountEntityRepo;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Model.StatementEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Repository.StatementEntityRepo;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Service.StatementEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class StatementEntityServiceImpl implements StatementEntityService {

    @Autowired
    private StatementEntityRepo statementEntityRepo;

    @Autowired
    private AccountEntityRepo accountEntityRepo;


    @Override
    public StatementEntity addStatementData(StatementEntity statement) {
        statement.setRefNo(generateReferenceNumber());
        return this.statementEntityRepo.save(statement);
    }

    public void addStatementData(
            String accountNumber,
            String amount,
            String desc,
            String type,
            String expenseType){
        String currentBalance=this.accountEntityRepo.getCurrentAccountBalance(accountNumber);

        StatementEntity statement=StatementEntity.builder()
                .account_number(accountNumber)
                .amount(amount)
                .transfer_account_number("Bank")
                .balance(currentBalance)
                .description(desc)
                .type(type)
                .expense_type(expenseType)
                .refNo(generateReferenceNumber())
                .transaction_date(LocalDate.now())
                .transaction_date_time(LocalDateTime.now())
                .build();

        this.statementEntityRepo.save(statement);
    }

    @Override
    public List<StatementEntity> getAllStatement(String acc_no) {

        return this.statementEntityRepo.getAllStatementByAccId(acc_no);
    }

    @Override
    public List<StatementEntity> getParticularMonthStatement(LocalDate start, LocalDate end,String acc_no) {
        return this.statementEntityRepo.getParticularDateStatement(start,end,acc_no);
    }

    public static String generateReferenceNumber() {
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
