package com.userbankdetails.EliteBank_UserBankMicroservice.User.Repository;

import com.userbankdetails.EliteBank_UserBankMicroservice.User.Model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserEntityRepo extends JpaRepository<UserEntity, String> {

    @Query(value="SELECT u FROM UserEntity u WHERE u.account_holder_email = :account_holder_email")
    public Optional<UserEntity> findUserByMail(@Param("account_holder_email") String account_holder_email);

    @Query(value="SELECT u FROM UserEntity u WHERE u.user_id = :Id")
    public UserEntity getDataOfParticularUser(@Param("Id") String Id);

    @Query("SELECT u.id FROM UserEntity u WHERE u.account_holder_email=:account_holder_email")
    public String ifUserExist(@Param("account_holder_email") String account_holder_email);


    @Query("SELECT u.user_id FROM UserEntity u WHERE u.account_holder_email=:account_holder_email and u.user_password=:user_password")
    public String checkUserCredentials(
            @Param("account_holder_email") String account_holder_email,
            @Param("user_password") String user_password
    );




}
