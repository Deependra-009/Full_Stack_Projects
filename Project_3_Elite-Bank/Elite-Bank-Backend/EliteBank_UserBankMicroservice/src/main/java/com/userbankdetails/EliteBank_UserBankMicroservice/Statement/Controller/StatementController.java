package com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Controller;

import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.DTO.Request.GetParticularStatementRequest;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Model.StatementEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.ServiceImplementation.StatementEntityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/statement")
public class StatementController {


    @Autowired
    private StatementEntityServiceImpl statementEntityService;

    @GetMapping("/get-current-month-statement/{account_no}")
    public List<StatementEntity> getCurrentMonthStatement(@PathVariable("account_no") String account_no){
        LocalDate currentDate = LocalDate.now();

        // Get the start day of the current month
        LocalDate startDay = currentDate.withDayOfMonth(1);

        // Get the end day of the current month
        LocalDate endDay = currentDate.withDayOfMonth(currentDate.lengthOfMonth());
        List<StatementEntity> statementEntityList= this.statementEntityService.getParticularMonthStatement(startDay,endDay,account_no);
        return statementEntityList;
    }

    @PostMapping("/add-statement/{acc_no}")
    public StatementEntity addStatement(@RequestBody StatementEntity statement,@PathVariable("acc_no") String acc_no) {
        statement.setAccount_number(acc_no);
        return this.statementEntityService.addStatementData(statement);
    }

    @GetMapping("/get-statement/{acc_no}")
    public List<StatementEntity> getAllStatement(@PathVariable("acc_no") String acc_no){
        return this.statementEntityService.getAllStatement(acc_no);
    }

    @PostMapping("/get-particular-statement/{acc_no}")
    public List<StatementEntity> getParticularDateStatement(@RequestBody GetParticularStatementRequest statement,
                                                            @PathVariable("acc_no") String acc_no){
        return this.statementEntityService.getParticularMonthStatement(statement.getStart(),statement.getEnd(),acc_no);
    }
}
