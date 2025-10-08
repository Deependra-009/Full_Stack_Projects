package com.backend.ProductMicroservice.servicesimplementation;

import static org.springframework.beans.BeanUtils.copyProperties;

import com.backend.OrderMicroservice.controller.CartController;
import com.backend.OrderMicroservice.responseDTO.ProductResponseDTO;
import com.backend.OrderMicroservice.services.impl.CartServiceImpl;
import com.backend.OtherMicroservice.controller.FavouriteController;
import com.backend.OtherMicroservice.serviceImpl.FavouriteServiceImpl;
import com.backend.ProductMicroservice.modals.ApparelCategoryData;
import com.backend.ProductMicroservice.modals.ProductModal;
import com.backend.ProductMicroservice.modals.ProductReviews;
import com.backend.ProductMicroservice.repository.ApparelCategoryRepository;
import com.backend.ProductMicroservice.repository.ProductRepository;
import com.backend.ProductMicroservice.services.ProductService;

import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ProductModalServiceImplementation implements ProductService {

    private final char[] ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();

    @Autowired
    private CartServiceImpl cartController;

    @Autowired
    private FavouriteServiceImpl favouriteController;

    @Autowired
    private ApparelCategoryRepository apparelCategoryRepository;

    @Autowired
    private RestTemplate restTemplate;

    private final MongoTemplate mongoTemplate;


    @Autowired
    private ProductRepository productRepository;

    /*******************************************************
     * Add Product Details
     *******************************************************/

    @Override
    public ProductModal addProduct(ProductModal product) {
        // TODO Auto-generated method stub
        String productID = UUID.randomUUID().toString();
        String productUSIN = this.generateUSIN();
        product.setProduct_id(productID);
        product.setProduct_usin(productUSIN);
        int randomNumber = generateRandomNumber();
        int increasedPrice = (int) calculateIncreasedPrice(Integer.parseInt(product.getProduct_price()), randomNumber);
        product.setProduct_mrp("" + increasedPrice);
        product.setProduct_discount(Double.parseDouble("" + randomNumber));


        return this.productRepository.save(product);
    }

    /*******************************************************
     * Get All Product Details
     *******************************************************/

    @Override
//    @Cacheable(value = "productCache", key = "T(java.util.Objects).hash(#isLogin, #department, #apparelcategory, #producttype, #page, #pageSize)")
    public Page<ProductResponseDTO> getAllProduct(String isLogin, String department, String apparelcategory, String producttype, int page, int pageSize) {

        Map<String, Boolean> cartData = new ConcurrentHashMap<>();
        Map<String, Boolean> wishlistData = new ConcurrentHashMap<>();


        //        if (!isLogin.equals("NOT_LOGIN")) {
//            cartData = this.restTemplate.getForObject(CART_MICROSERVICE_URL + isLogin, Map.class);
//            wishlistData = this.restTemplate.getForObject(WISHLIST_MICROSERVICE_URL + isLogin, Map.class);
//        }
        // Check if the user is logged in and fetch cart and wishlist data
        if (!"NOT_LOGIN".equals(isLogin)) {
            try {
                Map<String, Boolean> cartDataResponse = this.cartController.getAllProducts(isLogin);

                Map<String, Boolean> wishlistDataResponse = this.favouriteController.getAllProducts(isLogin);

                // Clear cartData and wishlistData for the new user


                if (cartDataResponse != null) {
                    cartData.putAll(cartDataResponse);
                }

                if (wishlistDataResponse != null) {
                    wishlistData.putAll(wishlistDataResponse);
                }
            } catch (Exception e) {
                // Handle exceptions as needed
                e.printStackTrace();
            }
        }


        // Construct a Pageable object for pagination
        Pageable pageable = PageRequest.of(page, pageSize);

        // Retrieve a page of products based on criteria and pagination
        Page<ProductModal> productPage = findProductsByCriteria(department, apparelcategory, producttype, pageable);

        // Convert the page of products into a page of ProductResponseDTO
        Page<ProductResponseDTO> productResponsePage = productPage.map(product -> {
            ProductResponseDTO productDTO = new ProductResponseDTO();
            copyProperties(product, productDTO);

            if (cartData.containsKey(product.getProduct_id())) {
                productDTO.setAddInCart(true);
            }
            if (wishlistData.containsKey(product.getProduct_id())) {
                productDTO.setAddInWishList(true);
            }

            return productDTO;
        });

        // Clear cartData and wishlistData after processing the response
        cartData.clear();
        wishlistData.clear();

        return productResponsePage;
    }

    /*******************************************************
     * clear cache of user whenever wishlist or any cart data changes
     *******************************************************/
    @Override
//    @CacheEvict(value = "productCache", key = "#isLogin")
    public void clearUserProductCache(String isLogin) {
        // Print all keys before eviction
        printAllKeys();



        // Print all keys after eviction
        printAllKeys();
    }

    private void printAllKeys() {


    }

    /*******************************************************
     * Get Particular Product Details
     *******************************************************/

    @Override
    public ProductResponseDTO getParticularProduct(String product_id) {
        // TODO Auto-generated method stub
        ProductModal product = productRepository.findParticularProduct(product_id);
        ProductResponseDTO response = new ProductResponseDTO();
        copyProperties(product, response);
        return response;

    }

    /*******************************************************
     * Add Review In Product
     *******************************************************/

    @Override
    public String addReviewInProduct(String product_id, ProductReviews product_review) {
        // TODO Auto-generated method stub
        ProductModal product = productRepository.findParticularProduct(product_id);

        HashSet<ProductReviews> getAllReviews = product.getProduct_reviews();
        getAllReviews.add(product_review);
        product.setProduct_reviews(getAllReviews);
        this.productRepository.save(product);
        return "Review Add Successfully";

    }

    /*******************************************************
     * Add Aparel Catgeory Data
     *******************************************************/
    @Override
    public void addApparelCategory(ApparelCategoryData apparelCategoryData) {
        this.apparelCategoryRepository.save(apparelCategoryData);
    }

    /*******************************************************
     * Generate USIN Method
     *******************************************************/

    private String generateUSIN() {
        StringBuilder random = new StringBuilder();

        for (int i = 0; i < 15; i++) {
            int index = (int) (Math.random() * ALPHANUMERIC.length);
            random.append(ALPHANUMERIC[index]);
        }

        return random.toString();
    }

    /*******************************************************
     * Get Search-Text Product
     *******************************************************/

    @Override
    public Page<ProductResponseDTO> getSearchData(String searchText, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<ProductModal> productPage = productRepository.searchData(searchText, pageable);

        return productPage.map(product -> {
            ProductResponseDTO productDTO = new ProductResponseDTO();

            copyProperties(product, productDTO);
            return productDTO;
        });
    }

    @Override
    public ApparelCategoryData getApparelCategory(String department_name, String apparel_category_name) {
        ApparelCategoryData data = this.apparelCategoryRepository.findByDepartmentNameAndApparelName(department_name.toLowerCase(), apparel_category_name);

        return data;
    }


    private int generateRandomNumber() {
        int min = 40;
        int max = 70;
        Random random = new Random();
        return random.nextInt((max - min) + 1) + min;
    }

    // Method to calculate the increased price based on the percentage increase
    private double calculateIncreasedPrice(int price, double percentageIncrease) {
        return price * (1 + (percentageIncrease / 100));
    }


//	public List<ProductModal> findProductsByCriteria(String department, String apparelCategory, String productType) {
//		Criteria criteria = new Criteria();
//
//		if (department != null) {
//			criteria.and("departmentType").is(department.toLowerCase());
////			Pattern pattern = Pattern.compile(department, Pattern.CASE_INSENSITIVE);
////			criteria.and("departmentType").regex(pattern);
//		}
//		if (apparelCategory != null) {
//			criteria.and("apparelCategory").is(apparelCategory.toLowerCase());
//		}
//		if (productType != null) {
//			criteria.and("productType").is(productType.toLowerCase());
//		}
//
//		Query query = new Query(criteria);
//		return mongoTemplate.find(query, ProductModal.class);
//	}

    public Page<ProductModal> findProductsByCriteria(String department, String apparelCategory, String productType, Pageable pageable) {
        Criteria criteria = new Criteria();

        if (department != null) {
            criteria.and("departmentType").is(department.toLowerCase());
        }
        if (apparelCategory != null) {
            criteria.and("apparelCategory").is(apparelCategory.toLowerCase());
        }
        if (productType != null) {
            criteria.and("productType").is(productType.toLowerCase());
        }

        Query query = new Query(criteria).with(pageable);

        List<ProductModal> results = mongoTemplate.find(query, ProductModal.class);


        return new PageImpl<>(results, pageable, results.size());
    }

}


