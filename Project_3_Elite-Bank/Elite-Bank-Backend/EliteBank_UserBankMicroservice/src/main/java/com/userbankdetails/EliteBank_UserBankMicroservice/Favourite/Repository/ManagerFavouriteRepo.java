package com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Repository;

import com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Model.ManageFavouriteEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManagerFavouriteRepo extends JpaRepository<ManageFavouriteEntity,Long> {


    @Query("SELECT u FROM ManageFavouriteEntity u WHERE u.user_id=:user_id")
    public List<ManageFavouriteEntity> getAllFavourite(@Param("user_id") String user_id);

    @Transactional
    @Modifying
    @Query("DELETE FROM ManageFavouriteEntity u WHERE u.user_id=:user_id AND u.favourite_id=:favourite_transaction_id")
    public void deleteFavouriteTransaction(
            @Param("user_id") String user_id,
            @Param("favourite_transaction_id") String favourite_transaction_id
    );




}
