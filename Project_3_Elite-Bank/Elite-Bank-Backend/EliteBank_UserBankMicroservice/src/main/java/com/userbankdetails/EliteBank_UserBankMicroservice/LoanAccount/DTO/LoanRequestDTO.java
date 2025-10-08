package com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class LoanRequestDTO {

    private String loan_number;
    private String account_number;
    private String loan_type;
    private String credit_card_number;
    private String loan_amount;
    private String total_tenure;
    private String interest_rate;
    private String user_id;
    private boolean loan_active;
    private String EMI;
    private String current_tenure;
    private String overdue_charges;
    private String loan_start_date;
    private String loan_end_date;
    private String total_interest;
    private String payable_amount;
}
