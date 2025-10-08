package com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Controller.Interface;

import com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Model.ManageFavouriteEntity;

import java.util.List;

public interface FavouriteControllerInterface {

    public ManageFavouriteEntity addFvourite(ManageFavouriteEntity data);

    public List<ManageFavouriteEntity> getAllFavourite(String user_id);
}
