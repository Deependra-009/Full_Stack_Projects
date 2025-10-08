package com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Controller.Implementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.RequestCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.ResponseCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CustomMessage;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Controller.Interface.DebitCardInterface;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.DTO.DebitCardResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model.DebitCardEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model.PinGenerationEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model.UpdateDebitCardEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.ServiceImplementation.DebitCardServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/debit-card")
@CrossOrigin("*")
public class DebitCardController implements DebitCardInterface {

    @Autowired
    private DebitCardServiceImpl debitCardService;


    @Override
    @PostMapping("/add-data")
    public DebitCardEntity addCardData(@RequestBody DebitCardEntity data) {
        return this.debitCardService.addDebitCard(data);

    }

    @Override
    @GetMapping("/get-all-cards/{user_id}")
    public List<DebitCardResponseDTO> getAllCards(@PathVariable("user_id") String user_id) {
        return this.debitCardService.getAllCards(user_id);
    }

    @PostMapping("/check-debit-card-pin")
    public ResponseEntity<ResponseCardDetailDTO> isCardPinValid(@RequestBody RequestCardDetailDTO cardDetailDTO){
        System.out.println("debit card pin");
        System.out.println(cardDetailDTO);
        ResponseCardDetailDTO result=this.debitCardService.checkCardPin(cardDetailDTO);
        if(result.isValid()) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseCardDetailDTO(false,"xxx"),HttpStatus.FORBIDDEN);
    }

    @PatchMapping("/upgrade-debit-card")
    public ResponseEntity<CustomMessage> upgradeDebitCardType(
            @RequestBody UpdateDebitCardEntity updateDebitCardEntity
            ){
        try{
            this.debitCardService.updateDebitCardTypeData(updateDebitCardEntity);
            CustomMessage cm=new CustomMessage("Successfully Card Update");
            return new ResponseEntity<>(cm,HttpStatus.OK);
        }catch (Exception e){
            System.out.println(e);
            CustomMessage cm=new CustomMessage("Error: "+(e));
            return new ResponseEntity<>(cm,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/deactivate-debit-card/{user-id}/{card-number}")
    public ResponseEntity<CustomMessage> deActivateDebitCard(
            @PathVariable("user-id") String user_id,
            @PathVariable("card-number") String card_number
    ){
        this.debitCardService.deActivateDebitCard(user_id,card_number);
        CustomMessage cm=new CustomMessage("Deactivate Successfully");
        return new ResponseEntity<>(cm,HttpStatus.OK);
    }

    @PostMapping("/instant-pin-generation")
    public ResponseEntity<CustomMessage> instantPinGeneration(@RequestBody PinGenerationEntity pinGenerationEntity){

        this.debitCardService.instantPinGeneration(pinGenerationEntity);
        CustomMessage cm=new CustomMessage("Successfully Pin Generated");
        return new ResponseEntity<>(cm,HttpStatus.OK);
    }
}
