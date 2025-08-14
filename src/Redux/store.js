import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Recducer/ProductReducer";
import WishListReducer from "./Recducer/WishListReducer";
import CartReducer from "./Recducer/CartReducer";
import LoginReducer from "./Recducer/LoginReducer";

export default configureStore({
    devTools: true,
    reducer : {
        Products: ProductReducer,
        WishList: WishListReducer,
        Cart: CartReducer,
        Login: LoginReducer
    }
})