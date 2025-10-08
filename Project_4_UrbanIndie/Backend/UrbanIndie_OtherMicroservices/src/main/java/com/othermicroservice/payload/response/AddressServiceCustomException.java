package com.othermicroservice.payload.response;

import lombok.Data;

@Data
public class AddressServiceCustomException  extends RuntimeException {
    private String errorCode;

    public AddressServiceCustomException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
