package globalbazar.order.services;

import java.util.List;

import globalbazar.order.requestDTO.CartRequestDTO;
import globalbazar.order.responseDTO.CartResponseDTO;
import globalbazar.order.responseDTO.ProductResponseDTO;

public interface CartService {
	
	
	 CartResponseDTO addCart(CartRequestDTO cartData);
		
	 CartResponseDTO getCartParticularUser(String user_id);

	void updateProductSpecsInCart(String user_id, String product_id, String newQuantity, String newColor, String newSize);
	void changeProductQuantity(String user_id,String product_id,String quantity);
}
