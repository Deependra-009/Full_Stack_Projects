package com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PinGenerationEntity {

    private String card_number;
    private String user_id;
    private String card_pin;

}
