import { ProductReviews } from "./ProductReviews";

export interface ProductModal {

    product_id: String;
    product_usin:String;
	product_title:String;
	product_price:String;
	product_brand:String;
	product_image1:String;
	product_image2:String;
	product_image3:String;
	product_image4:String;
	product_maincategory:String;
	product_category:String;
	product_subcategory:String;
	product_total_rating:String;
	product_average_rating:String;
	product_seller_id:String;
	product_quantity:String;
	product_status:String;
	product_description:String;
    product_color:String[];
    product_size:String[];
    model_details:String[];
    product_reviews:Array<ProductReviews>;
    product_details:String[];
    delievery_options:String[];
}