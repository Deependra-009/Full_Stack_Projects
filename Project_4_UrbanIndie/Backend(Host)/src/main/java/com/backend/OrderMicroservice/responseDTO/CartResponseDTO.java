package com.backend.OrderMicroservice.responseDTO;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CartResponseDTO {
	private String cart_id;
	private String user_id;
	private List<ProductResponseDTO> products;
}
