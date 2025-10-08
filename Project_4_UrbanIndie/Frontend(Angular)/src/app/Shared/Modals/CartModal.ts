import { ProductCartEntity } from './ProductCartEntity';
export interface CartModal {
    cart_id: String;
    user_id: String;
    products: Array<ProductCartEntity>;
}