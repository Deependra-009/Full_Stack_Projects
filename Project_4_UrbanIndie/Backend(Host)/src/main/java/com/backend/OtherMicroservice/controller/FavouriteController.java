package com.backend.OtherMicroservice.controller;


import com.backend.OtherMicroservice.payload.request.FavouriteRequest;
import com.backend.OtherMicroservice.payload.response.FavouriteResponse;
import com.backend.OtherMicroservice.payload.response.MessageDTO;
import com.backend.OtherMicroservice.service.FavouriteService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/favourite")
@CrossOrigin(origins="*")
@Log4j2
public class FavouriteController {
    @Autowired
    private FavouriteService favouriteService;

    @GetMapping("/test")
    public String testing(){
        return "Favourite Controller Run Successfully";
    }

    @PostMapping("/add-product-wishlist")
    public ResponseEntity<MessageDTO> addProductInFav(@RequestBody FavouriteRequest favRequest){
        this.favouriteService.addProductInWishlist(favRequest);
        return new ResponseEntity<>(new MessageDTO("Add Successfully"),HttpStatus.OK);
    }

    @GetMapping("/get-all-product-particular-user/{user_id}")
    public ResponseEntity<FavouriteResponse> getAllFavProductOfParticularUser(@PathVariable("user_id") String user_id){
        System.out.println("-->>"+user_id);

        FavouriteResponse response=this.favouriteService.getAllProductInWishList(user_id);
        System.out.println("=>>>>"+(response));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/remove-product-from-wishlist/{user_id}/{product_id}")
    public ResponseEntity<MessageDTO> removeParticularProductFromWishList(@PathVariable("user_id") String user_id,
                                                                          @PathVariable("product_id") String product_id){
        this.favouriteService.removeProductFromWishlist(user_id,product_id);
        return new ResponseEntity<>(new MessageDTO("Remove Successfully"),HttpStatus.OK);
    }

    public Map<String,Boolean> getAllProducts(@PathVariable("user_id") String user_id){
        return this.favouriteService.getAllProducts(user_id);
    }






    

}
