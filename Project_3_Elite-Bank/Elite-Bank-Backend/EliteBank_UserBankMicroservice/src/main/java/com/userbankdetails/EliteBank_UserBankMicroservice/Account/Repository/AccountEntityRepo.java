package com.userbankdetails.EliteBank_UserBankMicroservice.Account.Repository;

import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Model.AccountEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountEntityRepo extends JpaRepository<AccountEntity,Long> {

    @Query(value="SELECT u FROM AccountEntity u WHERE u.account_number=:account_no")
    AccountEntity getDataOfAccountNo(@Param("account_no") String account_no);

    @Query("SELECT COUNT(u) " +
            "FROM AccountEntity u " +
            "WHERE " +
            "   CASE " +
            "      WHEN :same_bank = true THEN " +
            "          u.account_number = :acc_no " +
            "      ELSE " +
            "         u.account_ifsccode = :ifsc_code AND u.account_number = :acc_no " +
            "   END"
    )
    int ifExistData(
            @Param("acc_no") String acc_no,
            @Param("ifsc_code") String ifsc_code,
            @Param("same_bank") boolean same_bank);

    @Transactional
    @Modifying
    @Query("UPDATE AccountEntity u " +
            "SET u.account_balance=:account_balance " +
            "WHERE u.account_number=:account_number ")
   void updateAccountBalance(
            @Param("account_balance") String account_balance,
            @Param("account_number") String account_number
    );

    @Query("SELECT u.account_balance FROM AccountEntity u WHERE u.account_number=:account_number")
    String getCurrentAccountBalance(
            @Param("account_number") String account_number
    );

}
