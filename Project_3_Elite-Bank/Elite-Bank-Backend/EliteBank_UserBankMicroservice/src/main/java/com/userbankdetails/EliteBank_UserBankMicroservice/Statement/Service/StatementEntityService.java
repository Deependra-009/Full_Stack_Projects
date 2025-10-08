package com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Service;

import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Model.StatementEntity;

import java.time.LocalDate;
import java.util.List;

public interface StatementEntityService {

    public StatementEntity addStatementData(StatementEntity statement);
    public List<StatementEntity> getAllStatement(String acc_no);

    public List<StatementEntity> getParticularMonthStatement(LocalDate start,LocalDate end,String acc_no);

}
