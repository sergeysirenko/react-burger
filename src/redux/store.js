import { configureStore } from '@reduxjs/toolkit'
// import categoryReducer from "./slices/categorySlice";
// import sortReducer from "./slices/sortSlice";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import burger from "./slices/burgerSlice";

export const store = configureStore({
    reducer: {
        // category: categoryReducer,
        // sort: sortReducer,
        filter,
        cart,
        burger,
    },
})