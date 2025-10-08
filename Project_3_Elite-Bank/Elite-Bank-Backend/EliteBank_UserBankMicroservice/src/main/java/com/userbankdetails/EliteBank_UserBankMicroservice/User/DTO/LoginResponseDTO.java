package com.userbankdetails.EliteBank_UserBankMicroservice.User.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponseDTO {

    private String user_id;
    private String jwtToken;
    private String message;

}
