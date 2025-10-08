package com.backend.OrderMicroservice.services.impl;


import com.backend.OrderMicroservice.entities.CartEntity;
import com.backend.OrderMicroservice.repository.CartRepository;
import com.backend.OrderMicroservice.requestDTO.CartRequestDTO;
import com.backend.OrderMicroservice.responseDTO.CartResponseDTO;
import com.backend.OrderMicroservice.responseDTO.ProductResponseDTO;
import com.backend.OrderMicroservice.services.CartService;
import com.backend.ProductMicroservice.controller.ProductController;
import com.backend.ProductMicroservice.modals.ProductModal;
import com.backend.ProductMicroservice.repository.ProductRepository;
import com.backend.exception.CustomException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.client.RestTemplate;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.beans.BeanUtils.copyProperties;

@Service
public class CartServiceImpl implements CartService {
	
	
	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CartRepository cartRepository;


	
	/***********************************************
	 * Add Product data in Cart
	 ***********************************************/

	@Override
	public CartResponseDTO addCart(CartRequestDTO cartData) {
		
		String UserID=cartData.getUser_id();
		String CartID;
		CartResponseDTO cartResponse=new CartResponseDTO();
		
		if(this.cartRepository.findCartParicularUser(cartData.getUser_id())==null) {
			CartID = UUID.randomUUID().toString();
			List<String> cartProducts=new ArrayList<>();
			cartProducts.add(cartData.getProduct_id()+"/"+cartData.getProduct_quantity()
			+"/"+cartData.getProduct_colour()+"/"+cartData.getProduct_size());
			CartEntity cartEntity=CartEntity.builder()
					.cart_id(CartID)
					.user_id(UserID)
					.product_id_and_product_quantity_and_product_colour_and_product_size(cartProducts)
					.build();

			this.cartRepository.save(cartEntity);
			BeanUtils.copyProperties(cartEntity, cartResponse);
			
			List<ProductResponseDTO> list=fetchProductData(cartProducts);
			cartResponse.setProducts(list);
			
		}
		else {
			CartEntity cart=this.cartRepository.findCartParicularUser(UserID);
			List<String> productList=cart.getProduct_id_and_product_quantity_and_product_colour_and_product_size();

			boolean isPresent=false;
			for(String s:productList){
				if(s.split("/")[0].equals(cartData.getProduct_id())){
					isPresent=true;
					break;
				}
			}
			if(!isPresent){
				productList.add(cartData.getProduct_id()+"/"+cartData.getProduct_quantity());
				cart.setProduct_id_and_product_quantity_and_product_colour_and_product_size(productList);
				this.cartRepository.save(cart);
			}



			BeanUtils.copyProperties(cart, cartResponse);
			
			List<ProductResponseDTO> list=fetchProductData(productList);
			cartResponse.setProducts(list);
		}

		return cartResponse;
		
		
	}


	/***********************************************
	 * Fetch Cart data of Particular User
	 ***********************************************/
	
	@Override
	public CartResponseDTO getCartParticularUser(String user_id) {
		CartEntity cart=this.cartRepository.findCartParicularUser(user_id);
		if(cart==null) throw new CustomException("No Product Found In Cart Given UserID","PRODUCT_NOT_FOUND");
		List<ProductResponseDTO> list=fetchProductData(cart.getProduct_id_and_product_quantity_and_product_colour_and_product_size());
		CartResponseDTO cartresponse=new CartResponseDTO();
		BeanUtils.copyProperties(cart,cartresponse);
		cartresponse.setProducts(list);
		return cartresponse;
	}



	/***********************************************
	 * Update quantity
	 ***********************************************/
@Override
	public void changeProductQuantity(String user_id,String product_id,String quantity){
		CartEntity cart=this.cartRepository.findCartParicularUser(user_id);
			for(int i=0;i<cart.getProduct_id_and_product_quantity_and_product_colour_and_product_size().size();i++){

				String s=cart.getProduct_id_and_product_quantity_and_product_colour_and_product_size().get(i);

				String[] arr=s.split("/");
			if(product_id.equals(arr[0])){
				cart.getProduct_id_and_product_quantity_and_product_colour_and_product_size().set(i,arr[0]+"/"+quantity);

				break;
			}
		}
		this.cartRepository.save(cart);

	}

	/***********************************************
	 * Update Product Specifications
	 ***********************************************/
	@Override
	public void updateProductSpecsInCart(String user_id, String product_id, String newQuantity, String newColor, String newSize) {
		CartEntity cart = cartRepository.findCartParicularUser(user_id);

		for (int i = 0; i < cart.getProduct_id_and_product_quantity_and_product_colour_and_product_size().size(); i++) {
			String s = cart.getProduct_id_and_product_quantity_and_product_colour_and_product_size().get(i);
			String[] arr = s.split("/");

			if (product_id.equals(arr[0])) {
				// Ensure arr has at least 2 elements for quantity and product ID
				if (arr.length < 2) {
					// If there are fewer than 2 elements, add placeholders (null or empty string) for missing fields
					while (arr.length < 2) {
						arr = Arrays.copyOf(arr, 2); // Ensure arr has at least 2 elements
						arr[arr.length - 1] = null; // Add null for missing fields
					}
				}

				// Update quantity if newQuantity is provided
				if (newQuantity != null && !newQuantity.isEmpty()) {
					arr[1] = newQuantity;
				}

				// Update color if newColor is provided
				if (newColor != null && !newColor.isEmpty()) {
					// Ensure arr has at least 3 elements for color
					while (arr.length < 3) {
						arr = Arrays.copyOf(arr, 3); // Ensure arr has at least 3 elements
						arr[arr.length - 1] = null; // Add null for missing fields
					}
					arr[2] = newColor;
				}

				// Update size if newSize is provided
				if (newSize != null && !newSize.isEmpty()) {
					// Ensure arr has at least 4 elements for size
					while (arr.length < 4) {
						arr = Arrays.copyOf(arr, 4); // Ensure arr has at least 4 elements
						arr[arr.length - 1] = null; // Add null for missing fields
					}
					arr[3] = newSize;
				}

				// Rest of your code
				cart.getProduct_id_and_product_quantity_and_product_colour_and_product_size().set(i, String.join("/", arr));
				break;
			}
		}

		this.cartRepository.save(cart);


	}




	/***********************************************
	 * Remove All Product From Cart
	 ***********************************************/

	public void removeAllProductFromCart(String user_id){
		CartEntity cart=this.cartRepository.findCartParicularUser(user_id);
		if(cart==null) throw new CustomException("No Product Found In Cart Given UserID","PRODUCT_NOT_FOUND");

		this.cartRepository.delete(cart);
	}

	/***********************************************
	 * Remove Particular Product From Cart
	 ***********************************************/

	public void removeParticularProductFromCart(String user_id,String product_id){
		CartEntity cart=this.cartRepository.findCartParicularUser(user_id);
		if(cart==null) throw new CustomException("No Product Found In Cart Given UserID","PRODUCT_NOT_FOUND");
		List<String> newlist=cart.getProduct_id_and_product_quantity_and_product_colour_and_product_size().stream()

				.filter((e)->!e.split("/")[0].equals(product_id))
				.toList();
		cart.setProduct_id_and_product_quantity_and_product_colour_and_product_size(newlist);
		this.cartRepository.save(cart);

	}




	
	/***********************************************
	 * Fetch Product data from Product Microservice
	 ***********************************************/
	
	private List<ProductResponseDTO> fetchProductData(List<String> cartProduct) {
		List<ProductResponseDTO> list = new ArrayList<>();

		for(String s:cartProduct){
			String[] arr=s.split("/");
			ProductModal productmodalres= this.productRepository.findParticularProduct(arr[0]);

			ProductResponseDTO response = new ProductResponseDTO();
			copyProperties(productmodalres, response);

			ProductResponseDTO product=new ProductResponseDTO();
			BeanUtils.copyProperties(response,product);


			product.setProduct_quantity(arr.length >= 2 ? arr[1] : null);
			product.setSelectedProductColour(arr.length >= 3 ? arr[2] : null);
			product.setSelectedProductSize(arr.length >= 4 ? arr[3] : null);
			product.setAddInCart(true);
			list.add(product);
		}

		return list;
	}



	public Map<String,Boolean> getAllProducts(@PathVariable("user_id") String user_id){
		CartEntity cart=this.cartRepository.findCartParicularUser(user_id);
		if(cart==null) return new HashMap<>();
		return cart.getProduct_id_and_product_quantity_and_product_colour_and_product_size()
				.stream()
				.collect(Collectors.toMap(productId -> productId.split("/")[0], productId -> true));
	}



}
