package com.productmicroservice.controller;

import java.util.List;

import com.productmicroservice.modals.ApparelCategoryData;
import com.productmicroservice.modals.TemporaryDataForAdding;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.productmicroservice.modals.ProductModal;
import com.productmicroservice.modals.ProductReviews;
import com.productmicroservice.responseDTO.ProductResponseDTO;
import com.productmicroservice.servicesimplementation.ProductModalServiceImplementation;

@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductController {



    @Autowired
    private ProductModalServiceImplementation productService;

    @GetMapping("/test")
    public String test() {
        return "Product Microservice run successfully";
    }


    /****************************************************************************************************************
     * ADD PRODUCT
     ****************************************************************************************************************/


    @PostMapping("/add-product")
    public ResponseEntity<String> addProduct(@RequestBody List<ProductModal> productModal) {
//		Set<ProductModal> product=productModal.getData();
//		System.out.println(productModal);
        for (ProductModal pm : productModal) {
            pm.setDepartmentType(pm.getDepartmentType().toLowerCase());
            pm.setApparelCategory(pm.getApparelCategory().toLowerCase());
            pm.setProductType(pm.getProductType().toLowerCase());
            ProductModal product = this.productService.addProduct(pm);
//            System.out.println(pm);
        }
//		

        return new ResponseEntity<String>("Data Add Successfully", HttpStatus.OK);
//		return new ResponseEntity<ProductModal>(product, HttpStatus.OK);
    }

    /****************************************************************************************************************
     GET PRODUCT
     ****************************************************************************************************************/

    @GetMapping(value={
            "/get-all-product/{isLogin}",
            "/get-all-product/{isLogin}/{department}",
            "/get-all-product/{isLogin}/{department}/{apparelcategory}",
            "/get-all-product/{isLogin}/{department}/{apparelcategory}/{producttype}"
    })
    public ResponseEntity<Page<ProductResponseDTO>> getAllProduct(@PathVariable("isLogin") String isLogin,
                                                                  @PathVariable(value="department",required = false) String department,
                                                                  @PathVariable(value="apparelcategory",required = false) String apparelcategory,
                                                                  @PathVariable(value="producttype",required = false) String producttype,
                                                                  @RequestParam(value = "page", defaultValue = "0",required = false) int page,
                                                                  @RequestParam(value = "pageSize", defaultValue = "100", required = false) int pageSize) {
        System.out.println("user id: "+isLogin+"department: "+department+",apparel category:"+apparelcategory+" "+"product type:"+producttype);
        Page<ProductResponseDTO> response = productService.getAllProduct(isLogin, department, apparelcategory, producttype, page, pageSize);

        HttpStatus httpStatus = response == null ? HttpStatus.NO_CONTENT :
                response.getContent().isEmpty() ? HttpStatus.NO_CONTENT :
                        response.getContent().size() < pageSize ? HttpStatus.PARTIAL_CONTENT : HttpStatus.OK;

        return new ResponseEntity<>(response,  httpStatus);
    }


    /************************************************************************************************************************
     * GET PARTICULAR PRODUCT DESCRIPTION
     ***********************************************************************************************************************/

    @GetMapping("/get-particular-product/{productId}")
    public ResponseEntity<ProductResponseDTO> getParticularProduct(@PathVariable("productId") String productID) {

        ProductResponseDTO response = this.productService.getParticularProduct(productID);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /************************************************************************************************************
     * Add Review In Product
     ************************************************************************************************************/

    @PostMapping("/add-review-in-product/{productId}")
    public ResponseEntity<String> addReviewInProduct(@PathVariable("productId") String productID,
                                                     @RequestBody ProductReviews productReviews) {

        String result = this.productService.addReviewInProduct(productID, productReviews);

        return new ResponseEntity<String>(result, HttpStatus.OK);

    }

    /************************************************************************************************************
     * Search Product
     ************************************************************************************************************/
    @GetMapping("/search-product/{search-text}")
    public ResponseEntity<Page<ProductResponseDTO>> searchProduct(
            @PathVariable("search-text") String searchText,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize
    ) {
        System.out.println("page number:"+page);
        System.out.println("page size:"+pageSize);
        Page<ProductResponseDTO> productData = productService.getSearchData(searchText, page, pageSize);



        return new ResponseEntity<>(productData, HttpStatus.OK);
    }

    /************************************************************************************************************
     * Apparel Category Data
     ************************************************************************************************************/

    @GetMapping("/apparel-category-data/{department_name}/{apparel_category_name}")
    public ResponseEntity<ApparelCategoryData> getApparelCategoryData(
            @PathVariable("department_name") String department_name,
            @PathVariable("apparel_category_name") String apparel_category_name
    ) {
        System.out.println("apparel:"+apparel_category_name);
        System.out.println("department:"+department_name);
        return new ResponseEntity<>(productService.getApparelCategory(department_name, apparel_category_name), HttpStatus.OK);
    }

    @PostMapping("/add-apparel-category-data")
    public String add_apparel_category_data(@RequestBody TemporaryDataForAdding data){
        for(ApparelCategoryData acd:data.getData()){
            System.out.println(acd);
            productService.addApparelCategory(acd);
        }
        return "data added successfully";
    }


    @GetMapping("/clear/{isLogin}")
    public String clearUserProductCache(@PathVariable String isLogin) {
        productService.clearUserProductCache(isLogin);
        return "Cache cleared for user with ID: " + isLogin;
    }

}
