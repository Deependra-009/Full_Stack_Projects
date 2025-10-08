package com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.ServiceImplementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.ExceptionHandler.CustomException;
import com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Model.ManageFavouriteEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Repository.ManagerFavouriteRepo;
import com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Service.ManageFavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ManagerFavouriteServiceImpl implements ManageFavouriteService {

    @Autowired
    private ManagerFavouriteRepo managerFavouriteRepo;
    @Override
    public ManageFavouriteEntity addFavouriteData(ManageFavouriteEntity data) {
        data.setFavourite_id(UUID.randomUUID().toString());
        return this.managerFavouriteRepo.save(data);
    }

    @Override
    public List<ManageFavouriteEntity> getAllFavouriteData(String user_id) {
        return this.managerFavouriteRepo.getAllFavourite(user_id);
    }

    public void deleteFavouriteTransaction(String user_id, String favourite_transaction_id){
        try{
            this.managerFavouriteRepo.deleteFavouriteTransaction(user_id, favourite_transaction_id);
        }
        catch(Exception e){
            throw new CustomException("Transaction Deletion Failed",""+HttpStatus.BAD_REQUEST);
        }
    }
}
