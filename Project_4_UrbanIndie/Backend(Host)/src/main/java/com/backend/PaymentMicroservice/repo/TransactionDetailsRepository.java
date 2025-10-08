package com.backend.PaymentMicroservice.repo;

import com.backend.PaymentMicroservice.model.TransactionDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TransactionDetailsRepository extends MongoRepository<TransactionDetails, String>{
    Optional<TransactionDetails> findByOrderId(String orderId);

}
