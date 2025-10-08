package com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Controller.Interface;

import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.CreditCardResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Model.CreditCardEntity;

import java.util.List;

public interface CreditCardControllerInterface {

    public CreditCardEntity addCreditCard(CreditCardEntity data);

    public List<CreditCardResponseDTO> getAllCreditCards(String user_id);

}
