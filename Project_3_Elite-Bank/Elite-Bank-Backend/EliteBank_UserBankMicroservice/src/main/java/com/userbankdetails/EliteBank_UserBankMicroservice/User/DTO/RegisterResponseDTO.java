package com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO;

import com.userbankdetails.EliteBank_UserBankMicroservice.Account.Model.AccountEntity;
import com.userbankdetails.EliteBank_UserBankMicroservice.CreditCard.DTO.CreditCardResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.DebitCard.DTO.DebitCardResponseDTO;
import com.userbankdetails.EliteBank_UserBankMicroservice.Statement.Model.StatementEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterResponseDTO {

    private String user_id;
    private String active;
    private String role;
    private String account_holder_name;
    private String account_holder_address;
    private String account_holder_city;
    private String account_holder_state;
    private String account_holder_country;
    private String account_holder_pincode;
    private String account_holder_phone_no;
    private String account_holder_email;
    private String account_holder_dob;
    private String account_holder_gender;
    private String account_holder_aadhar_no;
    private String account_holder_pan_no;
    private String account_holder_photo;
    private String account_holder_marital_status;
    private String account_holder_religion;
    private String account_holder_category;
    private String account_holder_occupation;
    private String account_holder_qualification;
    private String account_holder_staff_of_bank;
    private String account_holder_residency_status;
    private String account_holder_gross_income;
    private AccountEntity accountdata;
    private List<StatementEntity> statementEntityList;
    private List<DebitCardResponseDTO> debitCardEntityList;
    private List<CreditCardResponseDTO> creditCardEntityList;

}
