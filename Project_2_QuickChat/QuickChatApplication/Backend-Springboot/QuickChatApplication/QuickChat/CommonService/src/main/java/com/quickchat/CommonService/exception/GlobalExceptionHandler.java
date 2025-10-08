package com.quickchat.CommonService.exception;

import com.quickchat.CommonService.Core.HttpStatusCode;
import com.quickchat.CommonService.request.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException exception) {
        return new ResponseEntity<>(ErrorResponse.builder()
                .errorMessage(exception.getMessage())
                .errorCode(HttpStatusCode.httpStatus.get(exception.getErrorCode()))
                .build(), HttpStatus.NOT_FOUND);
    }


}

