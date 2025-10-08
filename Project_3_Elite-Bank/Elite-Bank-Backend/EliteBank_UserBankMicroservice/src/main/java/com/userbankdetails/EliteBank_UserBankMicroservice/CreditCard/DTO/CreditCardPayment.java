package com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CreditCardPayment {

    private String user_id;
    private String card_number;
    private String balance;
    private String account_number;
    private String total_balance;
}
