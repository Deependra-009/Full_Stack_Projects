package com.backend.ProductMicroservice.services;


import com.backend.OrderMicroservice.responseDTO.ProductResponseDTO;
import com.backend.ProductMicroservice.modals.ApparelCategoryData;
import com.backend.ProductMicroservice.modals.ProductModal;
import com.backend.ProductMicroservice.modals.ProductReviews;
import org.springframework.data.domain.Page;



public interface ProductService {

    ProductModal addProduct(ProductModal product);

    Page<ProductResponseDTO> getAllProduct(String isLogin, String department, String apparelcategory, String producttype, int page, int pageSize);

    ProductResponseDTO getParticularProduct(String product_id);

    String addReviewInProduct(String product_id, ProductReviews product_review);

    Page<ProductResponseDTO> getSearchData(String searchText, int page, int pageSize);

    ApparelCategoryData getApparelCategory(String department_page, String apparel_category_name);

    void addApparelCategory(ApparelCategoryData apparelCategoryData);
   void clearUserProductCache(String isLogin);
}
