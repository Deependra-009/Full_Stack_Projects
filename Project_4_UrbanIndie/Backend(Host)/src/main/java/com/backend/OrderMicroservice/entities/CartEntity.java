package com.backend.OrderMicroservice.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection ="CartCollection")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CartEntity {
    @Id
    private String cart_id;
    private String user_id;
    private List<String> product_id_and_product_quantity_and_product_colour_and_product_size;
}
