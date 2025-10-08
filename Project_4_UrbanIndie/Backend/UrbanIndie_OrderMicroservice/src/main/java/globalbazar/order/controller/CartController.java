package globalbazar.order.controller;

import globalbazar.order.responseDTO.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import globalbazar.order.exception.OrderServiceCustomException;
import globalbazar.order.exception.UserNotAuthorizedCustomException;
import globalbazar.order.feignclient.AuthFeignClient;
import globalbazar.order.requestDTO.CartRequestDTO;
import globalbazar.order.responseDTO.CartResponseDTO;
import globalbazar.order.services.impl.CartServiceImpl;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private CartServiceImpl cartService;

	@Autowired
	private AuthFeignClient authFeignClient;

	@GetMapping("/test")
	private String test() {
		return "Cart Controller run successfully";
	}

	/***********************************************
	 * Add Product In Cart
	 ***********************************************/

	@PostMapping("/add-products-in-cart")
	public ResponseEntity<CartResponseDTO> addProductsInCart( @RequestBody CartRequestDTO cartdata) {
		CartResponseDTO cartResponse= this.cartService.addCart(cartdata);
		return new ResponseEntity<CartResponseDTO>(cartResponse,HttpStatus.OK);
	}

	/***********************************************
	 * Get Cart Data Particular User
	 ***********************************************/

	@GetMapping("/get-cart-particular-user/{user_id}")
	public ResponseEntity<CartResponseDTO> getCartParticularUser(@PathVariable String user_id) {

		CartResponseDTO cartResponse=this.cartService.getCartParticularUser(user_id);
		return new ResponseEntity<CartResponseDTO>(cartResponse,HttpStatus.OK);

	}

	/***********************************************
	 * Update Product Quantity
	 ***********************************************/

//	@GetMapping("/change-quantity-product/{user_id}/{product_id}/{quantity}")
//	public ResponseEntity<MessageDTO> increaseProductQuantity(@PathVariable("user_id") String user_id,
//														  @PathVariable("product_id") String product_id,
//														  @PathVariable("quantity") String quantity){
//
//		this.cartService.changeProductQuantity(user_id,product_id,quantity);
//		return new ResponseEntity<MessageDTO>(new MessageDTO("Update Quantity Successfully"),HttpStatus.OK);
//	}

	@GetMapping("/change-quantity-product")
	public ResponseEntity<MessageDTO> increaseProductQuantity(
			@RequestParam(name = "user_id") String user_id,
			@RequestParam(name = "product_id") String product_id,
			@RequestParam(name = "quantity", required = false) String quantity,
			@RequestParam(name = "color", required = false) String color,
			@RequestParam(name = "size", required = false) String size
	) {
		System.out.println("I am from cart controller increaseProductQuantity"+"id: "+product_id+" quantity:"+quantity+" color: "+color+" size:"+size);
		if (user_id == null || product_id == null || quantity == null || color == null || size == null) {
			return new ResponseEntity<>(new MessageDTO("Missing parameters"), HttpStatus.BAD_REQUEST);
		}
		cartService.updateProductSpecsInCart(user_id, product_id, quantity, color, size);
		return new ResponseEntity<>(new MessageDTO("Quantity updated successfully"), HttpStatus.OK);
	}

	/***********************************************
	 * Remove All Particular
	 ***********************************************/

	@GetMapping("/remove-all-product/{user_id}")
	public ResponseEntity<MessageDTO> removeAllProductFromCart(@PathVariable("user_id") String user_id){
		this.cartService.removeAllProductFromCart(user_id);
		return new ResponseEntity<>(new MessageDTO("Removed All Product Successfully"),HttpStatus.OK);
	}

	/***********************************************
	 * Remove Particular Product
	 ***********************************************/

	@DeleteMapping("/remove-particular-product/{user_id}/{product_id}")
	public ResponseEntity<MessageDTO> removeParticularProduct(@PathVariable("user_id") String user_id,
															  @PathVariable("product_id") String product_id){
		this.cartService.removeParticularProductFromCart(user_id,product_id);
		return new ResponseEntity<>(new MessageDTO("Removed Particular Product Successfully"),HttpStatus.OK);
	}


	@GetMapping("/internal-get-cart/{user_id}")
	public Map<String,Boolean> getAllProducts(@PathVariable("user_id") String user_id){
		return this.cartService.getAllProducts(user_id);
	}
}
