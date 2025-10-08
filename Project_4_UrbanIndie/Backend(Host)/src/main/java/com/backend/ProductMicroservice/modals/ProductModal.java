package com.backend.ProductMicroservice.modals;

import java.util.HashSet;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Document(collection = "ProductCollection")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductModal {

    @Id
    private String product_id;
    private String product_usin;
    private String product_mrp;
    private Double product_discount;
    private String product_title;
    private String product_price;
    private String product_brand;
    private String apparelCategory;
    private String productType;
    private String product_total_rating;
    private Double product_average_rating;
    private String product_seller_id;
    private String product_status;
    private String departmentType;
    private String product_description;
    private boolean isAddInWishList;
    private boolean isAddInCart;

    private List<String> product_images;

    @Builder.Default
    HashSet<String> product_color = new HashSet<>();

    @Builder.Default
    HashSet<String> product_size = new HashSet<>();

    @Builder.Default
    HashSet<String> model_details = new HashSet<>();

    @Builder.Default
    HashSet<ProductReviews> product_reviews = new HashSet<>();

    @Builder.Default
    HashSet<String> product_details = new HashSet<>();

    @Builder.Default
    HashSet<String> delievery_options = new HashSet<>();

    @Builder.Default
    HashSet<String> product_tags = new HashSet<>();


}
