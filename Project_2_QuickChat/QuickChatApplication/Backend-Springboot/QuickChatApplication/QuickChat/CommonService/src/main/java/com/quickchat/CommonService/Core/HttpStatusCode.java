package com.quickchat.CommonService.Core;

import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

public class HttpStatusCode {
    public static final Map<String, HttpStatus> httpStatus= Map.of(
            "USER_NOT_FOUND",HttpStatus.NOT_FOUND,
            "BAD_REQUEST",HttpStatus.BAD_REQUEST
    );
}
