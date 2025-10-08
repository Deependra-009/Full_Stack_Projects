package com.backend.ProductMicroservice.services;

//import com.productmicroservice.modals.Filters;
//import com.productmicroservice.responseDTO.ProductResponseDTO;

import com.backend.OrderMicroservice.responseDTO.ProductResponseDTO;
import com.backend.ProductMicroservice.modals.Filters;

import java.util.List;

public interface FilterService {
    List<ProductResponseDTO> applyFilters(Filters filters);

    boolean isPriceInRange(ProductResponseDTO product, List<String> Pricerange);

    boolean hasBrand(ProductResponseDTO product, List<String> brands);

    boolean hasColor(ProductResponseDTO product, List<String> colors);

    boolean hasStyle(ProductResponseDTO product, List<String> styles);

    boolean hasAvailability(ProductResponseDTO product, Boolean availability);

    boolean hasDiscount(ProductResponseDTO product, List<String> filterDiscounts);

    boolean hasCustomerRating(ProductResponseDTO product, List<String> customerRatings);

    boolean hasNeckType(ProductResponseDTO product, List<String> neckTypes);

    boolean hasOccasion(ProductResponseDTO product, List<String> occasions);

    boolean hasPattern(ProductResponseDTO product, List<String> patterns);

    boolean hasSleeveType(ProductResponseDTO product, List<String> sleeveTypes);

    boolean hasFit(ProductResponseDTO product, List<String> fits);

}
