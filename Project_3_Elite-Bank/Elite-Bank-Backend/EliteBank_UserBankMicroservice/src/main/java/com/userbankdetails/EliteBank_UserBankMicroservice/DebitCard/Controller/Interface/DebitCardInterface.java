package com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Controller.Interface;

import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.RequestCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.ResponseCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.DTO.DebitCardResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model.DebitCardEntity;

import java.util.List;

public interface DebitCardInterface {

    public DebitCardEntity addCardData(DebitCardEntity data);
    public List<DebitCardResponseDTO> getAllCards(String user_id);


}
