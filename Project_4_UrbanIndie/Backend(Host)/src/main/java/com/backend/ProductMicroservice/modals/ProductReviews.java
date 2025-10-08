package com.backend.ProductMicroservice.modals;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProductReviews {

    private String user_name;
    private String rating;
    private String title;
    private String body;
    private String date;


}
