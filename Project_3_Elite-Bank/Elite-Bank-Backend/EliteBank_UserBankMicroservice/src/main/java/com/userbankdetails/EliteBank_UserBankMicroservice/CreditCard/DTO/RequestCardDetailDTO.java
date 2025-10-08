package com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RequestCardDetailDTO {

    private String user_id;
    private String card_number;
    private String pin;
}
