package com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginRequestDTO {

    private String user_customer_id;
    private String user_password;
    private String account_holder_email;
}
