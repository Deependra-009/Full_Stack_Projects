package com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.ServiceImplementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Service.AccountEntityService;
import com.userbankdetails.EliteBank_UserBankMicroservice.Account.ServiceImplementation.AccountEntityServiceImpl;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.RequestCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.ResponseCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Controller.Interface.DebitCardInterface;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.DTO.DebitCardResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model.DebitCardEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model.PinGenerationEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model.UpdateDebitCardEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Repository.DebitCardRepo;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Service.DebitCardService;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.ServiceImplementation.StatementEntityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class DebitCardServiceImpl implements DebitCardService {

    @Autowired
    private DebitCardRepo debitCardRepo;

    @Autowired
    private StatementEntityServiceImpl statementEntityService;

    @Autowired
    private AccountEntityServiceImpl accountEntityService;
    @Override
    public DebitCardEntity addDebitCard(DebitCardEntity data) {
        data.setCard_number(generateRandomNumber(12));
        data.setCvv(generateRandomNumber(3));

        // set expiry date

        LocalDate currentDate = LocalDate.now();
        // Format and print the current date as MM/yyyy
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yyyy");
        LocalDate dateInThreeYears = currentDate.plusYears(3);
        String formattedDateInThreeYears = dateInThreeYears.format(formatter);
        data.setExpiryDate(formattedDateInThreeYears);

        data.setActive(true);

        return this.debitCardRepo.save(data);
//        return null;
    }

    @Override
    public List<DebitCardResponseDTO> getAllCards(String user_id) {
        List<DebitCardEntity> list=this.debitCardRepo.getAllCards(user_id);

        List<DebitCardResponseDTO> result=new ArrayList<>();

        for(DebitCardEntity data:list){

            DebitCardResponseDTO dto=DebitCardResponseDTO.builder()
                    .card_number(data.getCard_number())
                    .card_name(data.getCard_name())
                    .active(data.isActive())
                    .expiryDate(data.getExpiryDate())
                    .card_type(data.getCard_type())
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
        System.out.println(dto.getUser_id());
        System.out.println(dto.getCard_number());
        System.out.println(dto.getPin());
        String result=this.debitCardRepo.ifDebitPinValidOrNot(
                dto.getUser_id(),
                dto.getCard_number(),
                dto.getPin()
        );
        System.out.println(result);
        if (result == null) {
            return new ResponseCardDetailDTO(false,"xxx");
        }
        System.out.println(result);
        return new ResponseCardDetailDTO(true,result);
    }

    @Override
    public void updateDebitCardTypeData(UpdateDebitCardEntity updateDebitCardEntity) {
        this.accountEntityService.updateAmount(updateDebitCardEntity.getAmount(), updateDebitCardEntity.getAccount_number());
        this.statementEntityService.addStatementData(
                updateDebitCardEntity.getAccount_number(),
                updateDebitCardEntity.getAmount(),
                "Debit Card Upgrade",
                "debit",
                "other"
        );
        this.debitCardRepo.updateDebitCardTypeData(
                updateDebitCardEntity.getUser_id(),
                updateDebitCardEntity.getCard_number(),
                updateDebitCardEntity.getCard_type()
        );
    }

    public void deActivateDebitCard(String user_id,String card_number){
        this.debitCardRepo.deActivateDebitCard(user_id,card_number,false);
    }

    public void instantPinGeneration(PinGenerationEntity pinGenerationEntity){
        this.debitCardRepo.instantPinGenerationDebitCard(
                pinGenerationEntity.getUser_id(),
                pinGenerationEntity.getCard_number(),
                pinGenerationEntity.getCard_pin()
        );
    }
}
