import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import productReducer from "./slices/productSlice.js";
import cartReducer from "./slices/cartSlice.js";

const store = configureStore({
    reducer:{
        auth : authReducer,
        products : productReducer,
        cart: cartReducer,
    }
})

export default store;