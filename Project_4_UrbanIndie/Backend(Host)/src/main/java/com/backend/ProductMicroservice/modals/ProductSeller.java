package com.backend.ProductMicroservice.modals;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProductSeller {

    private String seller_id;
    private String seller_rating;
    private String seller_total_rating;
    private String seller_logo_url;
    private String seller_link;

}
