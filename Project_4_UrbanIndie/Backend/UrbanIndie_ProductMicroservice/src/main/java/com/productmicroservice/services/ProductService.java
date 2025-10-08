package com.productmicroservice.services;

import java.util.List;

import com.productmicroservice.modals.ApparelCategoryData;
import org.springframework.data.domain.Page;

import com.productmicroservice.modals.ProductModal;
import com.productmicroservice.modals.ProductReviews;
import com.productmicroservice.responseDTO.ProductResponseDTO;

public interface ProductService {

    ProductModal addProduct(ProductModal product);

    Page<ProductResponseDTO> getAllProduct(String isLogin, String department, String apparelcategory, String producttype, int page, int pageSize);

    ProductResponseDTO getParticularProduct(String product_id);

    String addReviewInProduct(String product_id, ProductReviews product_review);

    Page<ProductResponseDTO> getSearchData(String searchText, int page, int pageSize);

    ApparelCategoryData getApparelCategory(String department_page,String apparel_category_name);

    void addApparelCategory(ApparelCategoryData apparelCategoryData);
   void clearUserProductCache(String isLogin);
}
