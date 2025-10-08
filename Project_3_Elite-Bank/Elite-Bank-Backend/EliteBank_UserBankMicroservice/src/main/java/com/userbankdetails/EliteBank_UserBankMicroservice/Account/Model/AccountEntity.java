package com.userbankdetails.EliteBank_UserBankMicroservice.Account.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.userbankdetails.EliteBank_UserBankMicroservice.User.Model.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name="AccountDetails")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long account_table_id;

    private String customer_id;
    private String account_number;
    private String account_ifsccode;
    private String account_type;
    private String account_balance;
    private String account_total_loan;
    private String account_opening_date;

    @OneToMany(mappedBy = "accountdata",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<UserEntity> users;

}
