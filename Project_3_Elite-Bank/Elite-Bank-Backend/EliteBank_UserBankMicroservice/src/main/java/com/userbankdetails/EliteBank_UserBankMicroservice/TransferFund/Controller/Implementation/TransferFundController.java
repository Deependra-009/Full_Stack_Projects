package com.userbankdetails.EliteBank_UserBankMicroservice.TransferFund.Controller.Implementation;

import com.userbankdetails.EliteBank_UserBankMicroservice.TransferFund.Controller.Interface.TransferFundControllerInterface;
import com.userbankdetails.EliteBank_UserBankMicroservice.TransferFund.Model.TransferFundEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.TransferFund.ServiceImplementation.TransferFundServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/transfer")
@CrossOrigin
public class TransferFundController implements TransferFundControllerInterface {

    @Autowired
    private TransferFundServiceImpl transferFundService;
    @Override
    @PostMapping("/transfer-fund")
    public TransferFundEntity transferMoney(@RequestBody TransferFundEntity data) {
        System.out.println(data);
        return this.transferFundService.transferMoney(data);
//        return null;
    }
}
