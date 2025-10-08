package com.quickchat.UserService.repository;


import com.quickchat.CommonService.entity.UserEntity;
import com.quickchat.UserService.models.Response.FindUserByPhoneNumberOrUserNameResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,String> {

    @Query("SELECT u FROM UserEntity u WHERE u.userEmail=:userEmail")
    public UserEntity getUserFromDatabaseByEmail(
            @Param("userEmail") String userEmail
    );

    @Query("SELECT u FROM UserEntity u WHERE u.userID=:userID")
    public UserEntity getUserFromDatabaseByID(
            @Param("userID") String userID
    );

    /*
    * FindUserByPhoneNumber
    * */
    @Query("SELECT " +
            "new com.quickchat.UserService.models.Response.FindUserByPhoneNumberOrUserNameResponse(" +
            " u.userID,u.userEmail,u.userPhoneNumber,u.userAbout,u.userProfilePhoto,u.userName,u.userLastSeen,u.isUserDisabled " +
            ") " +
            "FROM UserEntity u " +
            "WHERE u.userPhoneNumber LIKE CONCAT(:searchText, '%') OR u.userName LIKE CONCAT(:searchText,'%')")
    public List<FindUserByPhoneNumberOrUserNameResponse> findUserByPhoneNumberOrUserNameResponse(
            @Param("searchText") String searchText
    );



}

