package com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseCardDetailDTO {

    private boolean valid;
    private String cvv;
}
