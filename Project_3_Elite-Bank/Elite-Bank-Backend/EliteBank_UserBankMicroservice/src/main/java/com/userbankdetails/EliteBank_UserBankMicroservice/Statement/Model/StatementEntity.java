package com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="StatementEntity")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatementEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String account_number;
    private String transfer_account_number;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate transaction_date;
    private LocalDateTime transaction_date_time;
    private String description;
    private String amount;
    private String type;
    private String expense_type;
    private String balance;
    private String refNo;

}
