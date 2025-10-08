package com.productmicroservice.servicesimplementation;

import static org.springframework.beans.BeanUtils.copyProperties;

import com.productmicroservice.modals.ApparelCategoryData;
import com.productmicroservice.repository.ApparelCategoryRepository;
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
import com.productmicroservice.modals.ProductModal;
import com.productmicroservice.modals.ProductReviews;
import com.productmicroservice.repository.ProductRepository;
import com.productmicroservice.responseDTO.ProductResponseDTO;
import com.productmicroservice.services.ProductService;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ProductModalServiceImplementation implements ProductService {

    private final char[] ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toCharArray();

    public static final String CART_MICROSERVICE_URL = "http://localhost:8081/cart/internal-get-cart/";
    public static final String WISHLIST_MICROSERVICE_URL = "http://localhost:8086/favourite/internal-get-wishlist/";






    @Autowired
    private CacheManager cacheManager;
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
    @Cacheable(value = "productCache", key = "T(java.util.Objects).hash(#isLogin, #department, #apparelcategory, #producttype, #page, #pageSize)")
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
                Map<String, Boolean> cartDataResponse = this.restTemplate.exchange(
                        CART_MICROSERVICE_URL + isLogin,
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<Map<String, Boolean>>() {}
                ).getBody();

                Map<String, Boolean> wishlistDataResponse = this.restTemplate.exchange(
                        WISHLIST_MICROSERVICE_URL + isLogin,
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<Map<String, Boolean>>() {}
                ).getBody();

                // Clear cartData and wishlistData for the new user
                cartData.clear();
                wishlistData.clear();

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
    @CacheEvict(value = "productCache", key = "#isLogin")
    public void clearUserProductCache(String isLogin) {
        // Print all keys before eviction
        printAllKeys();

        // Evict the cache entry for the specified user ID
        Cache productCache = cacheManager.getCache("productCache");
        if (productCache != null) {
            productCache.evict(isLogin);
        }

        // Print all keys after eviction
        printAllKeys();
    }
    private void printAllKeys() {
        Cache productCache = cacheManager.getCache("productCache");

        if (productCache != null) {
            ConcurrentMap<Object, Object> nativeCache = (ConcurrentMap<Object, Object>) productCache.getNativeCache();

            System.out.println("All keys in productCache:");
            Set<Object> keys = nativeCache.keySet();
            for (Object key : keys) {
                System.out.println(key);
            }
        }
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
    public ApparelCategoryData getApparelCategory(String department_name,String apparel_category_name) {
        System.out.println(department_name+" "+apparel_category_name);
        ApparelCategoryData data=this.apparelCategoryRepository.findByDepartmentNameAndApparelName(department_name.toLowerCase(),apparel_category_name);

        System.out.println(data);
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
//		System.out.println(query);
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

//        System.out.println(results);

        return new PageImpl<>(results, pageable, results.size());
    }

}


