package com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Repository;

import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Model.StatementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StatementEntityRepo extends JpaRepository<StatementEntity,Long> {

    @Query("SELECT u FROM StatementEntity u WHERE u.account_number=:acc_no ORDER BY u.transaction_date_time DESC")
    public List<StatementEntity> getAllStatementByAccId(@Param("acc_no") String acc_no);

    @Query("SELECT u " +
            "FROM StatementEntity u " +
            "WHERE u.account_number=:acc_no AND u.transaction_date BETWEEN :start AND :end " +
            "ORDER BY u.transaction_date_time DESC")
    public List<StatementEntity> getParticularDateStatement(@Param("start") LocalDate start,
                                                            @Param("end") LocalDate end,
                                                            String acc_no);



}
