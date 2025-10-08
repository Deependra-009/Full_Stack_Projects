package globalbazar.order.repository;

import globalbazar.order.entities.OrderEntity;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


public interface OrderRepository extends MongoRepository<OrderEntity,String> {
	
	@Query("{'user_id':?0}")
	public List<OrderEntity> findAllOrderParticularUser(String user_id);
	
	@Query("{'order_id':?0}")
	public OrderEntity findParticularOrderOfParticularUser(String order_id);

	@Query("{'order_id': ?0, 'user_id': ?1}")
	Optional<OrderEntity> findOrderByOrder_idAndUser_id(String order_id, String user_id);
	@Query("{'user_id': ?0, 'order_date': { $gte: ?1, $lte: ?2 }}")
	List<OrderEntity> findOrdersByUserIdAndDateRange(String userId, Instant startDate, Instant endDate);
}
