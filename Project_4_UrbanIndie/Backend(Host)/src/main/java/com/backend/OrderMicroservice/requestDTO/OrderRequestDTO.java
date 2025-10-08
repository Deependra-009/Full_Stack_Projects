package com.backend.OrderMicroservice.requestDTO;

import com.backend.OrderMicroservice.entities.AddressEntity;
import com.backend.OrderMicroservice.entities.CartEntity;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class OrderRequestDTO {
    private String user_id;
    private String order_total_amount;
    private List<OrderedProductsList> order_products = new ArrayList<>();
    private String payment_mode;
    private CartEntity cart;
    private AddressEntity address;
}


