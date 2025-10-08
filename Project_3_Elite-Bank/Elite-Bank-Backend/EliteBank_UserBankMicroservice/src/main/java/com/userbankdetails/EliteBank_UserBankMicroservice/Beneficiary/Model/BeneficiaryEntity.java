package com.userbankdetails.EliteBank_UserBankMicroservice.Beneficiary.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="BeneficiaryEntity")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BeneficiaryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long beneficiaryId;
    private String user_id;
    @Column(unique = true)
    private String short_name;
    private String ifsc_code;
    private String bank_name;
    @Column(unique = true)
    private String account_number;
    private boolean same_bank=false;
    private boolean active=false;



}
