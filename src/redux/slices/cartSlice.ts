import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";

export type CartItemType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    steak: number;
    types: string;
    count: number;
}

interface CartSliceState {
    totalPrice: number;
    totalBurgers: number;
    items: CartItemType[]
}

const initialState: CartSliceState = {
    totalPrice: 0,
    totalBurgers: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(item => item.id === action.payload.id);

            if (findItem) findItem.count++;
            else state.items.push({...action.payload, count: 1});

            state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
            state.totalBurgers = state.items.reduce((sum, item) => item.count + sum, 0);
        },
        increaseCount(state, action: PayloadAction<string>) {
            const findItem = state.items.find(item => item.id === action.payload)
            if (findItem) findItem.count++;

            state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
            state.totalBurgers = state.items.reduce((sum, item) => item.count + sum, 0);
        },
        decreaseCount(state, action: PayloadAction<string>) {
            const findItem = state.items.find(item => item.id === action.payload)
            if (findItem) findItem.count--;

            state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
            state.totalBurgers = state.items.reduce((sum, item) => item.count + sum, 0);
        },
        deleteItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);

            state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
            state.totalBurgers = state.items.reduce((sum, item) => item.count + sum, 0);
        },
        deleteAll(state) {
            state.items = [];
            state.totalPrice = 0;
            state.totalBurgers = 0;
        }
    },
})

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;

export const { addItem, deleteItem, deleteAll, increaseCount, decreaseCount } = cartSlice.actions

export default cartSlice.reducer