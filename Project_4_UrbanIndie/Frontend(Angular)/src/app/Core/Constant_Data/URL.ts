// const host="https://urbanindie-backend.onrender.com";//////////////
const host="http://localhost:9090";

const ProductController=`${host}/product`;
const CartController=`${host}/cart`;
const OrderController=`${host}/order`
const WishListController=`${host}/favourite`;
const AddressController=`${host}/address`;
const FilterController=`${host}/product/filters`;
const AuthController=`${host}/api/v1/auth`;
const UserController=`${host}/api/v1/user`;

export {
    FilterController,
    ProductController,
    OrderController,
    CartController,
    WishListController,
    AddressController,
    AuthController,
    UserController
};



