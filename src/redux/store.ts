import { configureStore } from '@reduxjs/toolkit'
import filter from "./filter/slice";
import cart from "./cart/slice";
import burger from "./burger/slice";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        burger,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch