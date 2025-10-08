package com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DebitCardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long debit_card_id;
    private String marital_details;
    private String religion;
    private String category;
    private String occupation;
    private String qualification;
    private String house_ownership;
    private String residency_status;
    private String staff_of_bank;
    private String gross_annual_income;
    private String nominee_relationship;
    private String nominee_name;
    private String nominee_dob;
    private String nominee_phone_number;
    private String nominee_address;
    private String nominee_address_type;
    private String user_id;
    private String card_name;
    private String card_type;
    private String cvv;
    private String card_number;
    private String date_of_issued;
    private String card_pin;
    private boolean active;
    private String expiryDate;



}
