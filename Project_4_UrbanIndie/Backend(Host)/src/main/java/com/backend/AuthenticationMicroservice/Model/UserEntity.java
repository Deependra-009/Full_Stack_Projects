package com.backend.AuthenticationMicroservice.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "UsersCollection")
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
