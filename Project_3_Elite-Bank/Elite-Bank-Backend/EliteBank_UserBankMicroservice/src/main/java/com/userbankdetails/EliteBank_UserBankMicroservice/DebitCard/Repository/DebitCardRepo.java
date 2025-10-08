package com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Repository;

import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model.DebitCardEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DebitCardRepo extends JpaRepository<DebitCardEntity,Long> {

    @Query("SELECT u FROM DebitCardEntity u WHERE u.user_id=:user_id ")
    public List<DebitCardEntity> getAllCards(@Param("user_id") String user_id);

    @Transactional
    @Modifying
    @Query("UPDATE DebitCardEntity u " +
            "SET u.card_type=:card_type " +
            "WHERE u.card_number=:card_number AND u.user_id=:user_id")
    public void updateDebitCardTypeData(
            @Param("user_id") String user_id,
            @Param("card_number") String card_number,
            @Param("card_type") String card_type
    );

    @Query("SELECT u.cvv " +
            "FROM DebitCardEntity u " +
            "WHERE " +
            "CASE " +
            "WHEN :pin = u.card_pin AND :card_number = u.card_number AND :user_id = u.user_id THEN true ELSE false " +
            "END"
    )
    public String ifDebitPinValidOrNot(
            @Param("user_id") String user_id,
            @Param("card_number") String card_number,
            @Param("pin") String pin
    );



    @Modifying
    @Transactional
    @Query("UPDATE DebitCardEntity u " +
            "SET u.active=:active " +
            "WHERE u.card_number=:card_number AND u.user_id=:user_id ")
    public void deActivateDebitCard(
            @Param("user_id") String user_id,
            @Param("card_number") String card_number,
            @Param("active") boolean active
    );

    @Modifying
    @Transactional
    @Query("UPDATE DebitCardEntity u " +
            "SET u.card_pin=:card_pin " +
            "WHERE u.card_number=:card_number AND u.user_id=:user_id ")
    public void instantPinGenerationDebitCard(
            @Param("user_id") String user_id,
            @Param("card_number") String card_number,
            @Param("card_pin") String card_pin
    );





}
