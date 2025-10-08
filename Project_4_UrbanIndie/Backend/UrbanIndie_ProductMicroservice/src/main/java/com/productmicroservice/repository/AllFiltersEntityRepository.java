package com.productmicroservice.repository;

import com.productmicroservice.modals.AllFilterResponse;
import com.productmicroservice.modals.AllFiltersEntity;
import com.productmicroservice.modals.BrandFilter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AllFiltersEntityRepository extends MongoRepository<AllFiltersEntity,String> {

    @Query(" 'brand': { 'department':?0 }   ")
    public BrandFilter getAllFiltersOnlyDepartment(String department);

//    @Query("{ 'brand.department': ?0, 'brand.product': { $all: ?1 } }")
//    public AllFilterResponse getAllFiltersOnlyDepartment(String department, List<String> products);

    @Query("{ 'department': ?0, 'product': { $all: ?1 } }")
    public List<AllFiltersEntity> getAllFiltersOnlyDepartment(String department, List<String> productRegex);

}
