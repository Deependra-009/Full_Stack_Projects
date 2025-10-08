package com.othermicroservice.serviceImpl;

import com.othermicroservice.Repository.FavouriteRepo;
import com.othermicroservice.entities.FavouriteEntity;
import com.othermicroservice.exception.FavouriteServiceCustomException;
import com.othermicroservice.payload.request.FavouriteRequest;
import com.othermicroservice.payload.response.FavouriteResponse;
import com.othermicroservice.payload.response.ProductResponseDTO;
import com.othermicroservice.service.ConstantData;
import com.othermicroservice.service.FavouriteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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

        System.out.println(user_id);
        FavouriteEntity cart=this.favouriteRepo.findCartParicularUser(user_id);
        if(cart==null) throw new FavouriteServiceCustomException("No Product Found In Cart Given UserID","PRODUCT_NOT_FOUND");

        List<ProductResponseDTO> list=fetchProductData(cart.getProduct_list(),user_id);

        System.out.println(list);
        FavouriteResponse cartresponse=new FavouriteResponse();
        copyProperties(cart,cartresponse);
        cartresponse.setProducts(list);
        return cartresponse;
    }

    @Override
    public void removeProductFromWishlist(String user_id, String product_id) {
        FavouriteEntity cart=this.favouriteRepo.findCartParicularUser(user_id);
        if(cart==null) throw new FavouriteServiceCustomException("No Product Found In WishList Given UserID","PRODUCT_NOT_FOUND");

        List<String> newcart=cart.getProduct_list().stream()
                .filter((item)->!item.equals(product_id))
                .collect(Collectors.toList());

        if(newcart.isEmpty()){
            this.favouriteRepo.delete(cart);
            return;
        }
        cart.setProduct_list(newcart);
        this.favouriteRepo.save(cart);

    }

    @Override
    public Map<String,Boolean> getAllProducts(String user_id) {
        FavouriteEntity favouriteEntity=this.favouriteRepo.findCartParicularUser(user_id);
        if(favouriteEntity==null) return new HashMap<>();
        return favouriteEntity.getProduct_list()
                .stream()
                .collect(Collectors.toMap(productId -> productId, productId -> true));
    }   

    /***********************************************
     * Fetch Product data from Product Microservice
     ***********************************************/

    private List<ProductResponseDTO> fetchProductData(List<String> cartProduct,String user_id) {

        cartData = this.restTemplate.getForObject(CART_MICROSERVICE_URL + user_id, Map.class);
        List<ProductResponseDTO> list = new ArrayList<>();
        for(String s:cartProduct){

            ProductResponseDTO product= restTemplate.getForObject(ConstantData.PRODUCT_MICROSERVICE_URL+s,ProductResponseDTO.class );

            product.setAddInWishList(true);
            if(cartData.containsKey(s)){
                product.setAddInCart(true);
            }
            list.add(product);
            System.out.println(list.size());
        }

        return list;
    }
}


