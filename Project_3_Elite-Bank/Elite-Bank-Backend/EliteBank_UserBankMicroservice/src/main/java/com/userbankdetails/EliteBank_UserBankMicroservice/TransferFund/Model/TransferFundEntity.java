package com.userbankdetails.EliteBank_UserBankMicroservice.TransferFund.Model;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TransferFundEntity {

    private String fromAccountNo;
    private String toAccountNo;
    private String ifsc_code;
    private String status;
    private String amount;
    private String description;
    private String expenseType;
    
}
