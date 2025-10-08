package com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.Repository;

import com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.Model.LoanEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<LoanEntity, Long> {


    @Query("SELECT SUM(CAST(a.loan_amount AS LONG)) FROM LoanEntity a " +
            "WHERE a.user_id=:user_id AND a.account_number=:account_number ")
    public String totalLoanAmount(
            @Param("user_id") String user_id,
            @Param("account_number") String account_number
    );

    @Query("SELECT a FROM LoanEntity a WHERE a.user_id=:user_id AND a.account_number=:account_number ")
    public List<LoanEntity> getAllLoansUser(
            @Param("user_id") String user_id,
            @Param("account_number") String account_number
    );



}
