package com.backend.OtherMicroservice.Repository;

import com.backend.OtherMicroservice.entities.AddressEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepo extends MongoRepository<AddressEntity,String> {
//    List<AddressEntity> findAllByUserId(String user_id);

    @Query("{'user_id':?0}")
    public List<AddressEntity> findAddressParicularUser(String user_id);

}
