package com.othermicroservice.service;

import com.othermicroservice.payload.request.FavouriteRequest;
import com.othermicroservice.payload.response.FavouriteResponse;

import java.util.Map;

public interface FavouriteService {

    void addProductInWishlist(FavouriteRequest favouriteRequest);

    FavouriteResponse getAllProductInWishList(String user_id);

    void removeProductFromWishlist(String user_id, String product_id);

    Map<String, Boolean> getAllProducts(String user_id);

}
