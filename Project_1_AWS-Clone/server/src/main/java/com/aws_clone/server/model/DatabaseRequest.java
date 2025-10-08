package com.aws_clone.server.model;

import lombok.Data;

@Data
public class DatabaseRequest {
    private String dbType;
    private String dbName;
    private String username;
    private String password;
}
