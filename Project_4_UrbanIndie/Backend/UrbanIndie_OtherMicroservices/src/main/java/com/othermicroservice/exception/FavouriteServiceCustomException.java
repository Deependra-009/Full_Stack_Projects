package com.othermicroservice.exception;

import lombok.Data;

@Data
public class FavouriteServiceCustomException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    private String errorCode;

    public FavouriteServiceCustomException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
