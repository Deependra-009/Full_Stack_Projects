package com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Service;

import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.CreditCardResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.RequestCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.ResponseCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Model.CreditCardEntity;

import java.util.List;

public interface CreditCardService {

    public CreditCardEntity addCreditCardData(CreditCardEntity data);

    public List<CreditCardResponseDTO> getAllCreditCard(String user_id);

    public ResponseCardDetailDTO checkCardPin(RequestCardDetailDTO dto);


}
