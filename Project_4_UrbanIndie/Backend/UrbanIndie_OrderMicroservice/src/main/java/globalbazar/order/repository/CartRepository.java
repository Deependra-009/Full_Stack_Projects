package globalbazar.order.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import globalbazar.order.entities.CartEntity;

@Repository
public interface CartRepository extends MongoRepository<CartEntity, String> {
	
	@Query("{'user_id':?0}")
	public CartEntity findCartParicularUser(String user_id);

//	@Query(value="{'user_id' : $0}", delete = true)
//	public CartEntity deleteByCartId (String id);
//
//

}
