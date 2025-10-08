package com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Controller.Interface;

import com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Model.BeneficiaryEntity;

import java.util.List;

public interface BeneficiaryControllerInterface {

    public BeneficiaryEntity addBeneficiary(BeneficiaryEntity data);

    public List<BeneficiaryEntity> getAllBeneficiary(String user_id);
}
