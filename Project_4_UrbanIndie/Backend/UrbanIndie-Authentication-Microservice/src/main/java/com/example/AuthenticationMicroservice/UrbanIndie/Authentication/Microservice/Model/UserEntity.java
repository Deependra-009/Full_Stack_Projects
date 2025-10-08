package com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "UserEntity")
@Builder
@ToString
public class UserEntity  {

    @Id
    private String user_id;
    private String name;
    private String email;
    private String picture_url;
    private String phone_number;
    private String gender;
    private String date_of_birth;





}
