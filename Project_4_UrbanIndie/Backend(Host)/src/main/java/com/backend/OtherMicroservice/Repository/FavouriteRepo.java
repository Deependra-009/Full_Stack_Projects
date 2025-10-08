package com.backend.OtherMicroservice.Repository;

import com.backend.OtherMicroservice.entities.FavouriteEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface FavouriteRepo extends MongoRepository<FavouriteEntity,String> {

    @Query("{'user_id':?0}")
    public FavouriteEntity findCartParicularUser(String user_id);

    @Query("'user_id':?0")
    FavouriteEntity findProductIdsByUserId(@Param("userId") String userId);
}
