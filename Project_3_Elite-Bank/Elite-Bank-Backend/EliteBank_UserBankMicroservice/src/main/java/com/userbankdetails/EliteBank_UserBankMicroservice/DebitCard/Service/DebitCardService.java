package com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Service;

import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.RequestCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.ResponseCardDetailDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.DTO.DebitCardResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model.DebitCardEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model.UpdateDebitCardEntity;

import java.util.List;

public interface DebitCardService {

    public DebitCardEntity addDebitCard(DebitCardEntity data);

    public List<DebitCardResponseDTO> getAllCards(String user_id) ;

    public ResponseCardDetailDTO checkCardPin(RequestCardDetailDTO dto);

    public void updateDebitCardTypeData(UpdateDebitCardEntity updateDebitCardEntity);


}
