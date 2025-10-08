package com.paymentmicroservice.repo;

import com.paymentmicroservice.model.TransactionDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface TransactionDetailsRepository extends MongoRepository<TransactionDetails, String>{
    Optional<TransactionDetails> findByOrderId(String orderId);

}
