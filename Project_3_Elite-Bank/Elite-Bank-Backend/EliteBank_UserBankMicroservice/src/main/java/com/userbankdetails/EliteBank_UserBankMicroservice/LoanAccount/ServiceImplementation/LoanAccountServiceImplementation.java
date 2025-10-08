package com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.ServiceImplementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.DTO.LoanRequestDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.Model.LoanEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.Repository.LoanRepository;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.ServiceImplementation.StatementEntityServiceImpl;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Controller.Implementation.UserController;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class LoanAccountServiceImplementation {

    @Autowired
    private LoanRepository loanRepository;

    public void saveLoanData(LoanRequestDTO loanRequestDTO) {


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        LocalDate loan_start_date = LocalDate.parse(loanRequestDTO.getLoan_start_date(), formatter);
        LocalDate loan_end_date = LocalDate.parse(loanRequestDTO.getLoan_end_date(), formatter);


        LoanEntity loanEntity = LoanEntity
                .builder()
                .build();
        BeanUtils.copyProperties(loanRequestDTO, loanEntity);


        loanEntity.setLoan_number(UserController.generateRandomNumber(10));
        loanEntity.setLoan_start_date(loan_start_date);
        loanEntity.setLoan_end_date(loan_end_date);
        loanEntity.setLoan_active(true);


        this.loanRepository.save(loanEntity);
    }

    public String getTotalLoanAmount(String account_number, String user_id) {
        String amount = this.loanRepository.totalLoanAmount(
                user_id,
                account_number
        );
        return amount;
    }

    public List<LoanEntity> getAllLoanParticularUser(String user_id, String account_number) {
        return this.loanRepository.getAllLoansUser(user_id, account_number);
    }


}
