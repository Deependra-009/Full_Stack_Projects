package com.backend.ProductMicroservice.servicesimplementation;


import com.backend.OrderMicroservice.responseDTO.ProductResponseDTO;
import com.backend.ProductMicroservice.modals.ProductModal;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.beans.BeanUtils.copyProperties;

@Service
@Log4j2
@RequiredArgsConstructor
public class FiltersServiceImpl  {
    @Autowired
    private RestTemplate restTemplate;

    private Map<String,Boolean> cartData=new HashMap<>();
    private Map<String,Boolean> wishlistData=new HashMap<>();
    public static final String CART_MICROSERVICE_URL="http://localhost:8081/cart/internal-get-cart/";
    public static final String WISHLIST_MICROSERVICE_URL="http://localhost:8086/favourite/internal-get-wishlist/";

    @Autowired
    private final MongoTemplate mongoTemplate;

    /****************************************************************
     * Apply Filters
     ***************************************************************/

    public List<ProductResponseDTO> getAllProductAfterFilter(String isLogin, HashMap<String, List<String>> filterList){
        if (!isLogin.equals("NOT_LOGIN")) {
            cartData = this.restTemplate.getForObject(CART_MICROSERVICE_URL + isLogin, Map.class);
            wishlistData = this.restTemplate.getForObject(WISHLIST_MICROSERVICE_URL + isLogin, Map.class);
        }

        List<ProductModal> productList=this.findProductsByFilter(filterList);
        return productList.stream()
                .map(product -> {
                    ProductResponseDTO productDTO = new ProductResponseDTO();
                    copyProperties(product, productDTO);

                    if (cartData.containsKey(product.getProduct_id())) {
                        productDTO.setAddInCart(true);
                    }
                    if (wishlistData.containsKey(product.getProduct_id())) {
                        productDTO.setAddInWishList(true);
                    }

                    return productDTO;
                })
                .collect(Collectors.toList());
    }

    public List<ProductModal> findProductsByFilter(HashMap<String, List<String>> filterList){
        Criteria criteria=new Criteria();

        // brands
        if(filterList.containsKey("departmentType")){
            for(String filter:filterList.get("departmentType")){
                criteria.and("departmentType").is(filter);
            }
        }
        // brands
        if(filterList.containsKey("apparelCategory")){
            for(String filter:filterList.get("apparelCategory")){
                criteria.and("apparelCategory").is(filter);
            }
        }
        // brands
        if(filterList.containsKey("productType")){
            for(String filter:filterList.get("productType")){
                criteria.and("productType").is(filter);
            }
        }
        // size
        if(filterList.containsKey("size")){
            criteria.and("product_size").in(filterList.get("size"));
        }
        // brands
        if(filterList.containsKey("brands")){
            for(String filter:filterList.get("brands")){
                criteria.and("product_brand").is(filter);
            }
        }
        // gender
        if(filterList.containsKey("gender")){
            for(String filter:filterList.get("gender")){
                if(filter.equals("Male")) criteria.and("departmentType").is("men");
                if(filter.equals("Female")) criteria.and("departmentType").is("women");
            }
        }
        // customer rating
        if(filterList.containsKey("customerRatings")){
            double val=5;
            for(String filter:filterList.get("customerRatings")){
                val=Math.min(val,Double.parseDouble(filter));
            }
            criteria.and("product_average_rating").gt(val);
        }
        // discount
        if(filterList.containsKey("discount")){
            double val=100;
            for(String filter:filterList.get("discount")){
                val=Math.min(val,Double.parseDouble(filter));
            }
            criteria.and("product_discount").gt(val);
        }
        // availability
        if(filterList.containsKey("availability")){
            for(String filter:filterList.get("availability")){
                criteria.and("product_status").is(filter);
            }
        }


        Query query = new Query(criteria);
        return mongoTemplate.find(query, ProductModal.class);

    }









//
//    /****************************************************************************************************************
//     * Apply Filters
//     ****************************************************************************************************************/
//
//
//    @Override
//    public List<ProductResponseDTO> applyFilters(Filters filters) {
////        List<ProductResponseDTO> products = productService.getAllProduct(true);
//
////        return products.stream()
////                .filter(product -> isPriceInRange(product, filters.getPriceRange()))
////                .filter(product -> hasBrand(product, filters.getBrands()))
////                .filter(product -> hasColor(product, filters.getColors()))
////                .filter(product -> hasStyle(product, filters.getStyles()))
////                .filter(product -> hasAvailability(product, filters.getAvailability()))
////                .filter(product -> hasDiscount(product, filters.getDiscount()))
////                .filter(product -> hasCustomerRating(product, filters.getCustomerRatings()))
////                .filter(product -> hasNeckType(product, filters.getNeckType()))
////                .filter(product -> hasOccasion(product, filters.getOcassion()))
////                .filter(product -> hasPattern(product, filters.getPatterns()))
////                .filter(product -> hasSleeveType(product, filters.getSleveType()))
////                .filter(product -> hasFit(product, filters.getFit()))
////                .collect(Collectors.toList());
//        return null;
//    }
//
//    /****************************************************************************************************************
//     * Price Range
//     ****************************************************************************************************************/
//
//
//    public boolean isPriceInRange(ProductResponseDTO product, List<String> priceRange) {
//        String productPrice = product.getProduct_price();
//
//        if (priceRange != null && !priceRange.isEmpty()) {
//            String minPrice = priceRange.get(0);
//            String maxPrice = priceRange.get(priceRange.size() - 1);
//            return productPrice.compareTo(minPrice) >= 0 && productPrice.compareTo(maxPrice) <= 0;
//        }
//        // If no price range is specified, consider it within range
//        return true;
//    }
//
//    /****************************************************************************************************************
//     * Brand Filter
//     ****************************************************************************************************************/
//
//
//    public boolean hasBrand(ProductResponseDTO product, List<String> brands) {
//        String productBrand = product.getProduct_brand();
//        if (brands != null && !brands.isEmpty()) {
//            return brands.stream()
//                    .anyMatch(brand -> brand.equalsIgnoreCase(productBrand));
//        }
//        // If no brands are specified, consider it a match
//        return true;
//    }
//
//
//    /****************************************************************************************************************
//     *  Color Filter
//     ****************************************************************************************************************/
//
//
//    public boolean hasColor(ProductResponseDTO product, List<String> colors) {
//        Set<String> productColors = product.getProduct_color();
//        if (colors != null && !colors.isEmpty()) {
//            return colors.stream()
//                    .anyMatch(productColors::contains);
//        }
//        // If no colors are specified, consider it a match
//        return true;
//    }
//
//    /****************************************************************************************************************
//     * Style Filter
//     ****************************************************************************************************************/
//
//
//    public boolean hasStyle(ProductResponseDTO product, List<String> styles) {
//        Set<String> productStyles = product.getModel_details();
//        if (styles != null && !styles.isEmpty()) {
//            for (String style : styles) {
//                if (productStyles.contains(style)) {
//                    // Found a matching style
//                    return true;
//                }
//            }
//            // No matching style found
//            return false;
//        }
//        // If no styles are specified, consider it a match
//        return true;
//    }
//
//    /****************************************************************************************************************
//     * Availability check filter
//     ****************************************************************************************************************/
//
//
//    public boolean hasAvailability(ProductResponseDTO product, Boolean availability) {
//        String productStatus = product.getProduct_status();
//        if (availability != null) {
//            boolean isAvailable = productStatus.equalsIgnoreCase("available");
//            return availability == isAvailable;
//        }
//        // If no availability is specified, consider it a match
//        return true;
//    }
//
//    /****************************************************************************************************************
//     * Discount Filter
//     ****************************************************************************************************************/
//
//
//    public boolean hasDiscount(ProductResponseDTO product, List<String> filterDiscounts) {
////        if (filterDiscounts == null || filterDiscounts.isEmpty()) {
////            return true; // No filter applied, consider it a match
////        }
////
////        String productDiscount = product.getProduct_discount();
////        return filterDiscounts.contains(productDiscount);
//        return true;
//    }
//
//    /****************************************************************************************************************
//     * Customer Rating Filter
//     ****************************************************************************************************************/
//
//
//    public boolean hasCustomerRating(ProductResponseDTO product, List<String> customerRatings) {
//        String productTotalRating = product.getProduct_total_rating();
//        if (customerRatings != null && !customerRatings.isEmpty()) {
//            return customerRatings.stream()
//                    .anyMatch(rating -> productTotalRating.compareTo(rating) >= 0);
//        }
//        // If no customer ratings are specified, consider it a match
//        return true;
//    }
//
//    /****************************************************************************************************************
//     * NeckType Filter for shirts
//     ****************************************************************************************************************/
//
//
//    public boolean hasNeckType(ProductResponseDTO product, List<String> neckTypes) {
//        Set<String> productNeckTypes = product.getProduct_details();
//        if (neckTypes != null && !neckTypes.isEmpty()) {
//            for (String neckType : neckTypes) {
//                if (productNeckTypes.contains(neckType)) {
//                    // Found a matching neck type
//                    return true;
//                }
//            }
//            // No matching neck type found
//            return false;
//        }
//        // If no neck types are specified, consider it a match
//        return true;
//    }
//
//    /****************************************************************************************************************
//     *  Occasion Filter
//     ****************************************************************************************************************/
//
//
//    public boolean hasOccasion(ProductResponseDTO product, List<String> occasions) {
////        List<String> productOccasions = product.getOcassion();
////        if (occasions != null && !occasions.isEmpty()) {
////            for (String occasion : occasions) {
////                if (productOccasions.contains(occasion)) {
//        // Found a matching occasion
////                    return true;
////                }
////            }
//        // No matching occasion found
////            return false;
////        }
//        // If no occasions are specified, consider it a match
//        return true;
//    }
//
//    /****************************************************************************************************************
//     * Pattern check
//     ****************************************************************************************************************/
//
//
//    public boolean hasPattern(ProductResponseDTO product, List<String> patterns) {
//
//        return true;
//    }
//
//    /****************************************************************************************************************
//     * SleeveType check
//     ****************************************************************************************************************/
//
//
//    public boolean hasSleeveType(ProductResponseDTO product, List<String> sleeveTypes) {
//        return true;
//    }
//
//    /****************************************************************************************************************
//     * Fiting Filter
//     ****************************************************************************************************************/
//
//
//    public boolean hasFit(ProductResponseDTO product, List<String> fits) {
//        return true;
//    }

}
