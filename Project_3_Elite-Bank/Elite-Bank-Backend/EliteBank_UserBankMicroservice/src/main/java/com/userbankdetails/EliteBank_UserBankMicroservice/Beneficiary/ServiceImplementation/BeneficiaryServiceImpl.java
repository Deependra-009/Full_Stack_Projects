package com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.ServiceImplementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Model.BeneficiaryEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Repository.BeneficiaryRepo;
import com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Service.BeneficiaryService;
import com.userbankdetails.EliteBank_UserBankMicroservice.ExceptionHandler.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeneficiaryServiceImpl implements BeneficiaryService {

    @Autowired
    private BeneficiaryRepo beneficiaryRepo;
    @Override
    public BeneficiaryEntity addBeneficiary(BeneficiaryEntity data) {
        BeneficiaryEntity savedata=null;

        try{
            savedata=this.beneficiaryRepo.save(data);
        }
        catch(Exception e){
            throw new CustomException("Beneficiary already exist","ALREADY_EXIST");
        }
        return savedata;
    }

    @Override
    public List<BeneficiaryEntity> getAllBeneficiary(String user_id) {
        return this.beneficiaryRepo.getAllBeneficiaryEntity(user_id);
    }

    @Override
    public void deleteBeneficiary(String user_id,String account_number){
        this.beneficiaryRepo.deleteBeneficiaryByIdAndAccountNo(user_id,account_number);
        System.out.println("Beneficiary Deleted Successfully");
    }


}
