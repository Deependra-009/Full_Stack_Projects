package com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Service;

import com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Model.BeneficiaryEntity;

import java.util.List;

public interface BeneficiaryService {

    public BeneficiaryEntity addBeneficiary(BeneficiaryEntity data);
    public List<BeneficiaryEntity> getAllBeneficiary(String user_id);

    public void deleteBeneficiary(String user_id,String account_number);
}
