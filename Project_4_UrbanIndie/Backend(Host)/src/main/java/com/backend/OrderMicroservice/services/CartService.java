package com.backend.OrderMicroservice.services;


import com.backend.OrderMicroservice.requestDTO.CartRequestDTO;
import com.backend.OrderMicroservice.responseDTO.CartResponseDTO;

public interface CartService {
	
	
	 CartResponseDTO addCart(CartRequestDTO cartData);
		
	 CartResponseDTO getCartParticularUser(String user_id);

	void updateProductSpecsInCart(String user_id, String product_id, String newQuantity, String newColor, String newSize);
	void changeProductQuantity(String user_id,String product_id,String quantity);
}
