package com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.Repository;

import com.example.AuthenticationMicroservice.UrbanIndie.Authentication.Microservice.Model.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserEntity,String> {

    @Query("{'user_id':?0}")
    UserEntity isUserExist(String user_id);

}
