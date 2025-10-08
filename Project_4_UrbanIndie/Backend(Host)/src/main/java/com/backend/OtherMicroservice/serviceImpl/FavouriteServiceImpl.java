package com.backend.OtherMicroservice.serviceImpl;

import com.backend.OrderMicroservice.responseDTO.ProductResponseDTO;
import com.backend.OrderMicroservice.services.impl.CartServiceImpl;
import com.backend.OtherMicroservice.Repository.FavouriteRepo;
import com.backend.OtherMicroservice.entities.FavouriteEntity;
import com.backend.OtherMicroservice.payload.request.FavouriteRequest;
import com.backend.OtherMicroservice.payload.response.FavouriteResponse;
import com.backend.OtherMicroservice.service.ConstantData;
import com.backend.OtherMicroservice.service.FavouriteService;
import com.backend.ProductMicroservice.controller.ProductController;
import com.backend.ProductMicroservice.modals.ProductModal;
import com.backend.ProductMicroservice.repository.ProductRepository;
import com.backend.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.beans.BeanUtils.copyProperties;

@Service
@RequiredArgsConstructor
@Log4j2
public class FavouriteServiceImpl implements FavouriteService {
    private final FavouriteRepo favouriteRepo;
    private Map<String,Boolean> cartData=new HashMap<>();

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartServiceImpl cartService;

    public static final String CART_MICROSERVICE_URL="http://localhost:8081/cart/internal-get-cart/";


private final RestTemplate restTemplate;
    /***********************************************
     * Add Favourite data of Particular User
     ***********************************************/

    @Override
    public void addProductInWishlist(FavouriteRequest favouriteRequest) {

        String User_id=favouriteRequest.getUser_id();
        String FavId;
        if(this.favouriteRepo.findCartParicularUser(User_id)==null) {
            FavId = UUID.randomUUID().toString();
            List<String> favProducts=new ArrayList<>();
            favProducts.add(favouriteRequest.getProduct_id());
            FavouriteEntity cartEntity=FavouriteEntity.builder()
                    .favourite_id(FavId)
                    .user_id(User_id)
                    .product_list(favProducts)
                    .build();

            this.favouriteRepo.save(cartEntity);


        }
        else {
            FavouriteEntity cart=this.favouriteRepo.findCartParicularUser(User_id);
            List<String> productList=cart.getProduct_list();

            boolean isPresent=false;
            for(String s:productList){
                if(s.equals(favouriteRequest.getProduct_id())){
                    isPresent=true;
                    break;
                }
            }
            if(!isPresent){
                productList.add(favouriteRequest.getProduct_id());
                cart.setProduct_list(productList);
                this.favouriteRepo.save(cart);
            }

        }
    }

    /***********************************************
     * Fetch Favourite data of Particular User
     ***********************************************/
    @Override
    public FavouriteResponse getAllProductInWishList(String user_id) {

        FavouriteEntity cart=this.favouriteRepo.findCartParicularUser(user_id);
        if(cart==null) throw new CustomException("No Product Found In Cart Given UserID","PRODUCT_NOT_FOUND");

        List<ProductResponseDTO> list=fetchProductData(cart.getProduct_list(),user_id);

        FavouriteResponse cartresponse=new FavouriteResponse();
        BeanUtils.copyProperties(cart,cartresponse);
        cartresponse.setProducts(list);
        return cartresponse;
    }

    @Override
    public void removeProductFromWishlist(String user_id, String product_id) {
        FavouriteEntity cart=this.favouriteRepo.findCartParicularUser(user_id);
        if(cart==null) throw new CustomException("No Product Found In WishList Given UserID","PRODUCT_NOT_FOUND");
        if(cart.getProduct_list().isEmpty()){
            this.favouriteRepo.delete(cart);
            return;
        }
        List<String> newcart=cart.getProduct_list().stream()
                .filter((item)->!item.equals(product_id))
                .collect(Collectors.toList());
        cart.setProduct_list(newcart);
        this.favouriteRepo.save(cart);

    }




    /***********************************************
     * Fetch Product data from Product Microservice
     ***********************************************/

    private List<ProductResponseDTO> fetchProductData(List<String> cartProduct,String user_id) {

        cartData = this.cartService.getAllProducts(user_id);
        List<ProductResponseDTO> list = new ArrayList<>();
        for(String s:cartProduct){
            ProductModal productmodalres= this.productRepository.findParticularProduct(s);
            ProductResponseDTO response = new ProductResponseDTO();
            copyProperties(productmodalres, response);

            response.setAddInWishList(true);
            if(cartData.containsKey(s)){
                response.setAddInCart(true);
            }
            list.add(response);
        }



        return list;
    }

    public Map<String,Boolean> getAllProducts(String user_id) {
        FavouriteEntity favouriteEntity=this.favouriteRepo.findCartParicularUser(user_id);
        if(favouriteEntity==null) return new HashMap<>();
        return favouriteEntity.getProduct_list()
                .stream()
                .collect(Collectors.toMap(productId -> productId, productId -> true));
    }
}


