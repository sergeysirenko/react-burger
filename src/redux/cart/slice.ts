import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {calcTotalBurgers} from "../../utils/calcTotalBurgers";
import {CartItemType, CartSliceState} from "./types";

const initialState: CartSliceState = getCartFromLS();

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(item => item.id === action.payload.id);

            if (findItem) findItem.count++;
            else state.items.push({...action.payload, count: 1});

            state.totalPrice = calcTotalPrice(state.items);
            state.totalBurgers = calcTotalBurgers(state.items);
        },
        increaseCount(state, action: PayloadAction<string>) {
            const findItem = state.items.find(item => item.id === action.payload)
            if (findItem) findItem.count++;

            state.totalPrice = calcTotalPrice(state.items);
            state.totalBurgers = calcTotalBurgers(state.items);
        },
        decreaseCount(state, action: PayloadAction<string>) {
            const findItem = state.items.find(item => item.id === action.payload)
            if (findItem) findItem.count--;

            state.totalPrice = calcTotalPrice(state.items);
            state.totalBurgers = calcTotalBurgers(state.items);
        },
        deleteItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);

            state.totalPrice = calcTotalPrice(state.items);
            state.totalBurgers = calcTotalBurgers(state.items);
        },
        deleteAll(state) {
            state.items = [];
            state.totalPrice = 0;
            state.totalBurgers = 0;
        }
    },
})

export const { addItem, deleteItem, deleteAll, increaseCount, decreaseCount } = cartSlice.actions

export default cartSlice.reducer