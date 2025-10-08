package com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreditCardTransactionsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long credit_card_transactions_id;
    private String credit_card_number;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate transaction_date;
    private String description;
    private String amount;
    private String balance;
    private String refNo;

}
