import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartController } from '../../Constant_Data/URL';

@Injectable({
  providedIn: 'root'
})
export class CartApiGatewayService {

  constructor(
    private http:HttpClient
  ) { }

  addProductInCart(item:any){
    return this.http.post(`${CartController}/add-products-in-cart`,item);
  }

  getProductFromCart(user_id:String){
    return this.http.get(`${CartController}/get-cart-particular-user/${user_id}`);
  }

  updateProductQuantity(user_id:String,product_id:String,quantity:String){
    return this.http.get(`${CartController}/change-quantity-product/${user_id}/${product_id}/${quantity}`);
  }

  updateProductspecifications(user_id: string,product_id: string,quantity?: string,color?: string,size?: string){
    const params: any = {
      user_id: user_id,
      product_id: product_id,
    };
    if (quantity !== undefined) {
      params.quantity = quantity;
    }
    if (color !== undefined) {
      params.color = color;
    }
    if (size !== undefined) {
      params.size = size;
    }
    return this.http.get(`${CartController}/change-quantity-product`, { params: params });
    }

  removeAllProductFromCart(user_id:String){
    return this.http.get(`${CartController}/remove-all-product/${user_id}`);
  }

  removeParticularProductFromCart(user_id:String,product_id:String){
    return this.http.delete(`${CartController}/remove-particular-product/${user_id}/${product_id}`);
  }
}
