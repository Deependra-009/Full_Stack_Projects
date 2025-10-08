package com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UpdateDebitCardEntity {

    private String user_id;
    private String card_number;
    private String card_type;
    private String amount;
    private String account_number;

}
