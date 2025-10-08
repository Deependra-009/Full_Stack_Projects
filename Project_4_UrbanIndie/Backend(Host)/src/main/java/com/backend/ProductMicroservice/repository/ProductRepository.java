package com.backend.ProductMicroservice.repository;

import com.backend.ProductMicroservice.modals.ProductModal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.*;

@Repository
public interface ProductRepository extends MongoRepository<ProductModal, String> {


    @Query("{'product_id':?0}")
    ProductModal findParticularProduct(String product_id);

    @Query("{ $or: [ { 'product_title' : { $regex: ?0 , $options: 'i' } }, { 'departmentType' : { $regex: ?0 , $options: 'i' } } ] }")
    Page<ProductModal> searchData(String search_text, Pageable pageable);




}
