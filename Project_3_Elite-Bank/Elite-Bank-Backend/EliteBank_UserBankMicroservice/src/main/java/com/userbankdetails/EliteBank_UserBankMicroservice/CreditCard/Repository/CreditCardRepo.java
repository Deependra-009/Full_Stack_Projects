package com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Repository;

import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Model.CreditCardEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CreditCardRepo extends JpaRepository<CreditCardEntity,Long> {

    @Query("SELECT u FROM CreditCardEntity u WHERE u.user_id=:user_id")
    public List<CreditCardEntity> getAllCards(@Param("user_id") String user_id);

    @Query("SELECT u.cvv " +
            "FROM CreditCardEntity u " +
            "WHERE " +
            "CASE " +
            "WHEN :pin = u.card_pin AND :card_number = u.card_number AND :user_id = u.user_id THEN true ELSE false " +
            "END"
    )
    public String ifPinValidOrNot(
            @Param("user_id") String user_id,
            @Param("card_number") String card_number,
            @Param("pin") String pin
    );

    @Transactional
    @Modifying
    @Query("UPDATE CreditCardEntity u " +
            "SET u.balance=:balance " +
            "WHERE u.card_number=:card_number AND u.user_id=:user_id ")
    public void updateCreditCard(
            @Param("card_number") String card_number,
            @Param("user_id") String user_id,
            @Param("balance") String balance

    );

    @Modifying
    @Transactional
    @Query("UPDATE CreditCardEntity u " +
            "SET u.active=:active " +
            "WHERE u.card_number=:card_number AND u.user_id=:user_id ")
    public void deActivateCreditCard(
            @Param("user_id") String user_id,
            @Param("card_number") String card_number,
            @Param("active") boolean active
    );

    @Modifying
    @Transactional
    @Query("UPDATE CreditCardEntity u " +
            "SET u.card_pin=:card_pin " +
            "WHERE u.card_number=:card_number AND u.user_id=:user_id ")
    public void instantPinGenerationCreditCard(
            @Param("user_id") String user_id,
            @Param("card_number") String card_number,
            @Param("card_pin") String card_pin
    );

}
