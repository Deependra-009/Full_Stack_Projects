package com.userbankdetails.EliteBank_UserBankMicroservice.LoanAccount.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "LoanEntity")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class LoanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long loan_id;
    private String loan_number;
    private String account_number;
    private String loan_type;
    private String credit_card_number;
    private String loan_amount;
    private String total_tenure;
    private String interest_rate;
    private String user_id;
    private boolean loan_active;
    private String EMI;//------
    private String current_tenure;
    private String overdue_charges;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate loan_start_date;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate loan_end_date;
    private String total_interest;
    private String payable_amount;



}
