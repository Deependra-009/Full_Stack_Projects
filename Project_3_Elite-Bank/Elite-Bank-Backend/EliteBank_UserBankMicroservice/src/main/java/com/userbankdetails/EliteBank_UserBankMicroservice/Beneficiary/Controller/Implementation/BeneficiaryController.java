package com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Controller.Implementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Controller.Interface.BeneficiaryControllerInterface;
import com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Model.BeneficiaryEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.Account.ServiceImplementation.AccountEntityServiceImpl;
import com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.ServiceImplementation.BeneficiaryServiceImpl;
import com.userbankdetails.EliteBank_UserBankMicroservice.CustomMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/beneficiary")
@CrossOrigin
public class BeneficiaryController implements BeneficiaryControllerInterface {

    @Autowired
    private BeneficiaryServiceImpl beneficiaryService;
    @Autowired
    private AccountEntityServiceImpl accountEntityService;
    @Override
    @PostMapping("/add-beneficiary")
    public BeneficiaryEntity addBeneficiary(@RequestBody BeneficiaryEntity data) {
//        System.out.println(data);
//        if(this.accountEntityService.checkAccounts(data.getAccount_number(),data.getIfsc_code(),data.isSame_bank()) || data.getIfsc_code()!=null){
//            return this.beneficiaryService.addBeneficiary(data);
//
//        }
//        throw new RuntimeException("wrong value");

        return this.beneficiaryService.addBeneficiary(data);

    }

    @Override
    @GetMapping("/get-beneficiary/{user_id}")
    public List<BeneficiaryEntity> getAllBeneficiary(@PathVariable("user_id") String user_id) {
        return this.beneficiaryService.getAllBeneficiary(user_id);
    }

    @DeleteMapping("/delete-beneficiary")
    private ResponseEntity<CustomMessage> deleteBeneficiary(
            @RequestParam("user_id") String user_id,
            @RequestParam("account_number") String account_number
    ){

        this.beneficiaryService.deleteBeneficiary(user_id, account_number);
        CustomMessage cm=new CustomMessage("Beneficiary Deleted Successfully");
        return new ResponseEntity<>(cm, HttpStatus.OK);
    }
}
