package com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegisterRequestDTO {

    private String account_holder_email;
    private String user_password;
    private String account_holder_first_name;
    private String account_holder_last_name;
    private String account_holder_gender;
    private String account_holder_phone_no;
    private String account_holder_dob;
    private String account_holder_religion;
    private String account_holder_category;
    private String account_holder_occupation;
    private String account_holder_gross_income;
    private String account_holder_residency_status;
    private String account_holder_address;
    private String account_holder_city;
    private String account_holder_state;
    private String account_holder_country;
    private String account_holder_pincode;
    private String account_holder_marital_status;
    private String account_holder_aadhar_no;
    private String account_holder_pan_no;
    private String deposit_amount;




}

