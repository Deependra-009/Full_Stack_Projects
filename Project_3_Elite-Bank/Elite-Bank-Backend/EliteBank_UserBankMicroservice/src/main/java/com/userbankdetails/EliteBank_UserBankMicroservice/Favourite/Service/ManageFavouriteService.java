package com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Service;

import com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Model.ManageFavouriteEntity;

import java.util.List;

public interface ManageFavouriteService {

    public ManageFavouriteEntity addFavouriteData(ManageFavouriteEntity data);
    public List<ManageFavouriteEntity> getAllFavouriteData(String user_id);
}
