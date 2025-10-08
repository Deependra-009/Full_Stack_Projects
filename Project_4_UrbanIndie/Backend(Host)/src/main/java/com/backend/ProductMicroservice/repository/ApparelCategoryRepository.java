package com.backend.ProductMicroservice.repository;


import com.backend.ProductMicroservice.modals.ApparelCategoryData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ApparelCategoryRepository extends MongoRepository<ApparelCategoryData, String>
{

    @Query("{ 'department_name': ?0, 'apparel_category_name': { $regex: ?1 , $options: 'i' }}")
    ApparelCategoryData findByDepartmentNameAndApparelName(
      @Param("department_name") String department_name,
      @Param("apparel_name") String apparel_name
    );
}
