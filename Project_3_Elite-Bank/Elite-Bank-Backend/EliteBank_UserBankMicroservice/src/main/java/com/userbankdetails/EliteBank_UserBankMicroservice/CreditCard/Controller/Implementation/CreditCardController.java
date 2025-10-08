package com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Controller.Implementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Controller.Interface.CreditCardControllerInterface;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.CreditCardPayment;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.CreditCardResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.RequestCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.ResponseCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Model.CreditCardEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.ServiceImplementation.CreditCardServiceImpl;
import com.userbankdetails.EliteBank_UserBankMicroservice.CustomMessage;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model.PinGenerationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/api/v1/credit-card")
@RestController
public class CreditCardController implements CreditCardControllerInterface {
    @Autowired
    private CreditCardServiceImpl creditCardService;
    @Override
    @PostMapping("/add-credit-card")
    public CreditCardEntity addCreditCard(@RequestBody CreditCardEntity data) {
//        System.out.println(data);
        return this.creditCardService.addCreditCardData(data);
//        return null;
    }

    @Override
    @GetMapping("/get-all-cards/{user_id}")
    public List<CreditCardResponseDTO> getAllCreditCards(@PathVariable("user_id") String user_id) {
        return this.creditCardService.getAllCreditCard(user_id);
    }

    @PostMapping("/check-credit-card-pin")
    public ResponseEntity<ResponseCardDetailDTO> isCardPinValid(@RequestBody RequestCardDetailDTO cardDetailDTO){
        System.out.println(cardDetailDTO);
        ResponseCardDetailDTO result=this.creditCardService.checkCardPin(cardDetailDTO);
        if(result.isValid()) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseCardDetailDTO(false,"xxx"),HttpStatus.FORBIDDEN);
    }

    @PostMapping("/credit-card-payment")
    public ResponseEntity<CustomMessage> creditCardPayment(@RequestBody CreditCardPayment creditCardPayment){
        System.out.println(creditCardPayment);
        this.creditCardService.creditCardPayment(creditCardPayment);
        CustomMessage cm=new CustomMessage("ok");
        return new ResponseEntity<>(cm, HttpStatus.OK);
    }

    @DeleteMapping("/deactivate-credit-card/{user-id}/{card-number}")
    public ResponseEntity<CustomMessage> deActivateCreditCard(
            @PathVariable("user-id") String user_id,
            @PathVariable("card-number") String card_number
    ){
        this.creditCardService.deActivateCreditCard(user_id,card_number);
        CustomMessage cm=new CustomMessage("Deactivate Successfully");
        return new ResponseEntity<>(cm,HttpStatus.OK);
    }

    @PostMapping("/instant-pin-generation")
    public ResponseEntity<CustomMessage> instantPinGeneration(@RequestBody PinGenerationEntity pinGenerationEntity){

        this.creditCardService.instantPinGeneration(pinGenerationEntity);
        CustomMessage cm=new CustomMessage("Successfully Pin Generated");
        return new ResponseEntity<>(cm,HttpStatus.OK);
    }
}
