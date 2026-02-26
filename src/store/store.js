import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.js';
import productReducer from "./productSlice.js";
import categoriesReducer from "./categorySlice.js";
import userReducer from "./userSlice.js";
import adminReducer from "./adminSlice.js";
import orderReducer from './orderSlice.js';
import cartReducer from './cartSlice.js';
import wishlistReducer from './wishlistSlice.js';

export const store = configureStore({
    reducer: {
        "auth" : authReducer,
        "products" : productReducer,
        "category": categoriesReducer,
        "users" : userReducer,
        "admin": adminReducer,
        "orders" : orderReducer,
        "carts" : cartReducer,
        "wishlist" : wishlistReducer,
    }
})