import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from "./slices/categorySlice";
import sortReducer from "./slices/sortSlice";
import filter from "./slices/filterSlice";

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        sort: sortReducer,
        filter,
    },
})