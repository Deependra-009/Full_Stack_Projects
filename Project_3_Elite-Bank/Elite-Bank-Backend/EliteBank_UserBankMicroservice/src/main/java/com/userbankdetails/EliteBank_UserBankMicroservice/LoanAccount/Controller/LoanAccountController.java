package com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.Controller;

import com.userbankdetails.EliteBank_UserBankMicroservice.CustomMessage;
import com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.DTO.LoanRequestDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.Model.LoanEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.ServiceImplementation.LoanAccountServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/loan")
@CrossOrigin("*")
public class LoanAccountController {

    @Autowired
    private LoanAccountServiceImplementation loanAccountServiceImplementation;

    @PostMapping("/add-loan-data")
    private ResponseEntity<CustomMessage> addLoanData(
            @RequestBody LoanRequestDTO loanRequestDTO
            ){
        System.out.println(loanRequestDTO);
        this.loanAccountServiceImplementation.saveLoanData(loanRequestDTO);
        CustomMessage cm=new CustomMessage("Hello credit card loan");
        return new ResponseEntity<CustomMessage>(cm,HttpStatus.OK);
    }

    @GetMapping("/get-all-loan-by-user/{user-id}/{account-number}")
    private ResponseEntity<List<LoanEntity>> getAllLoansParticularUser(
            @PathVariable("user-id") String user_id,
            @PathVariable("account-number") String account_number
    ){
        CustomMessage cm=new CustomMessage("Hello credit card loan");
        return new ResponseEntity<>(this.loanAccountServiceImplementation.getAllLoanParticularUser(user_id, account_number),HttpStatus.OK);
    }
}
