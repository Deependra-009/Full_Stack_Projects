package com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Controller.Implementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.CustomMessage;
import com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Controller.Interface.FavouriteControllerInterface;
import com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.Model.ManageFavouriteEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.Favourite.ServiceImplementation.ManagerFavouriteServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/favourite")
@CrossOrigin
public class FavouriteController implements FavouriteControllerInterface {

    @Autowired
    private ManagerFavouriteServiceImpl managerFavouriteService;

    @Override
    @PostMapping("/add-favourite")
    public ManageFavouriteEntity addFvourite(@RequestBody ManageFavouriteEntity data) {
        return this.managerFavouriteService.addFavouriteData(data);
    }

    @Override
    @GetMapping("/get-all-favourite/{user_id}")
    public List<ManageFavouriteEntity> getAllFavourite(@PathVariable("user_id") String user_id) {
        return this.managerFavouriteService.getAllFavouriteData(user_id);
    }

    @DeleteMapping("/delete-favourite")
    public ResponseEntity<CustomMessage> deleteFavouriteTransaction(
            @RequestParam("user_id") String user_id,
            @RequestParam("favourite_transaction_id") String favourite_transaction_id
    ){
        this.managerFavouriteService.deleteFavouriteTransaction(user_id, favourite_transaction_id);

        CustomMessage cm=new CustomMessage("Successfully Deleted");
        return new ResponseEntity<>(cm, HttpStatus.OK);
    }
}
