package com.backend.OtherMicroservice.service;

import com.backend.OtherMicroservice.payload.request.FavouriteRequest;
import com.backend.OtherMicroservice.payload.response.FavouriteResponse;

import java.util.Map;

public interface FavouriteService {

    void addProductInWishlist(FavouriteRequest favouriteRequest);

    FavouriteResponse getAllProductInWishList(String user_id);

    void removeProductFromWishlist(String user_id, String product_id);

    public Map<String,Boolean> getAllProducts(String user_id);



}
