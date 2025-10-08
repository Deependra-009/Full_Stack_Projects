package com.backend.OrderMicroservice.requestDTO;

import lombok.Getter;


@Getter
public class OrderedProductsList {
    private String product_id;
    private String product_quantity;
    private String product_price;
    private String product_discount;
    private String product_colour;
    private String product_size;
}
