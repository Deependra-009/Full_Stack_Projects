package com.paymentmicroservice.exception;

import lombok.Data;

@Data
public class PaymentServiceCustomException extends RuntimeException{
    private final String errorCode;
    public PaymentServiceCustomException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
