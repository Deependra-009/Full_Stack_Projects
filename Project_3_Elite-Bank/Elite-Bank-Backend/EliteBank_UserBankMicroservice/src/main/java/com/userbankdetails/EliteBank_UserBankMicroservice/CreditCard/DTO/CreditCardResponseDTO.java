package com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreditCardResponseDTO {

    private String card_name;
    private String card_type;
    private String card_number;
    private String expiryDate;
    private boolean active;
    private String balance;
    private String card_limit;
}
