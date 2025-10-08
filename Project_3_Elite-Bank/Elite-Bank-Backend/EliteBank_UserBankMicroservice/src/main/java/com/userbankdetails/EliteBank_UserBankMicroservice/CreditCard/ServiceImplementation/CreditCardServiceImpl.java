package com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.ServiceImplementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Repository.AccountEntityRepo;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.CreditCardPayment;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.CreditCardResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.RequestCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.ResponseCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Model.CreditCardEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Repository.CreditCardRepo;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Service.CreditCardService;
import com.userbankdetails.EliteBank_UserBankMicroservice.CustomMessage;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model.PinGenerationEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.ServiceImplementation.StatementEntityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class CreditCardServiceImpl implements CreditCardService {
    @Autowired
    private CreditCardRepo creditCardRepo;

    @Autowired
    private AccountEntityRepo accountEntityRepo;

    @Autowired
    private StatementEntityServiceImpl statementEntityService;

    @Override
    public CreditCardEntity addCreditCardData(CreditCardEntity data) {
        data.setCard_number(generateRandomNumber(12));
        data.setCvv(generateRandomNumber(3));

        // set expiry date

        LocalDate currentDate = LocalDate.now();
        // Format and print the current date as MM/yyyy
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yyyy");
        LocalDate dateInThreeYears = currentDate.plusYears(3);
        String formattedDateInThreeYears = dateInThreeYears.format(formatter);
        data.setExpiry_date(formattedDateInThreeYears);
        data.setActive(true);
        return this.creditCardRepo.save(data);
    }

    @Override
    public List<CreditCardResponseDTO> getAllCreditCard(String user_id) {
        List<CreditCardResponseDTO> result=new ArrayList<>();
        List<CreditCardEntity> dbData=this.creditCardRepo.getAllCards(user_id);

        for(CreditCardEntity card:dbData){
            CreditCardResponseDTO dto=CreditCardResponseDTO.builder()
                    .card_number(card.getCard_number())
                    .card_name(card.getCard_name())
                    .card_type(card.getCard_type())
                    .active(card.isActive())
                    .expiryDate(card.getExpiry_date())
                    .card_limit(card.getCard_limit())
                    .balance(card.getBalance())
                    .build();
            result.add(dto);

        }

        return result;
    }

    private static String generateRandomNumber(int digits) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(digits);

        // Generate random digits
        for (int i = 0; i < digits; i++) {
            int digit = random.nextInt(10); // Generate a random digit (0-9)
            sb.append(digit);
        }

        return sb.toString();
    }

    @Override
    public ResponseCardDetailDTO checkCardPin(RequestCardDetailDTO dto){
        String result=this.creditCardRepo.ifPinValidOrNot(
                dto.getUser_id(),
                dto.getCard_number(),
                dto.getPin()
        );
        if (result == null) {
            return new ResponseCardDetailDTO(false,"xxx");
        }
        System.out.println(result);
        return new ResponseCardDetailDTO(true,result);
    }

    public void creditCardPayment(CreditCardPayment creditCardPayment){
        String balance=this.accountEntityRepo.getCurrentAccountBalance(creditCardPayment.getAccount_number());
        String updatedBalance=String.valueOf(
          Double.parseDouble(balance)-Double.parseDouble(creditCardPayment.getBalance())
        );
        String updateCreditBalance=String.valueOf(
                Double.parseDouble(creditCardPayment.getTotal_balance()) - Double.parseDouble(creditCardPayment.getBalance())
        );
        // update a balance
        this.accountEntityRepo.updateAccountBalance(updatedBalance, creditCardPayment.getAccount_number());

        // create a statement

        this.statementEntityService.addStatementData(
                creditCardPayment.getAccount_number(),
                creditCardPayment.getBalance(),
                "Credit Card Bill",
                "debit",
                "other"
        );

        this.creditCardRepo.updateCreditCard(
                creditCardPayment.getCard_number(),
                creditCardPayment.getUser_id(),
                updateCreditBalance
        );
    }
    public void deActivateCreditCard(String user_id,String card_number){
        this.creditCardRepo.deActivateCreditCard(user_id,card_number,false);
    }

    public void instantPinGeneration(PinGenerationEntity pinGenerationEntity){
        this.creditCardRepo.instantPinGenerationCreditCard(
                pinGenerationEntity.getUser_id(),
                pinGenerationEntity.getCard_number(),
                pinGenerationEntity.getCard_pin()
        );
    }
}
