import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WishListController } from '../../Constant_Data/URL';

@Injectable({
  providedIn: 'root'
})
export class WishlistAPIGatewayService {

  constructor(
    private http:HttpClient
  ) { }

  addProductInWishlist(data:any){
    return this.http.post(`${WishListController}/add-product-wishlist`,data);
  }

  getAllProductFromWishlist(user_id:String){
    return this.http.get(`${WishListController}/get-all-product-particular-user/${user_id}`);
  }

  removeProductFromWishList(user_id:String,product_id:String){
    return this.http.get(`${WishListController}/remove-product-from-wishlist/${user_id}/${product_id}`);
  }
}
