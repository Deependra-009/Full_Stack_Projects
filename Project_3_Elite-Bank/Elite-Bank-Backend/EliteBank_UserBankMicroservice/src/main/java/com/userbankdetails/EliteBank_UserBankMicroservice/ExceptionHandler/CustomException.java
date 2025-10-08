package com.userbankdetails.EliteBank_UserBankMicroservice.ExceptionHandler;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class CustomException extends RuntimeException{
    private final String errorCode;
    public CustomException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
