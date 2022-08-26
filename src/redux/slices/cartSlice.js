import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    totalBurgers: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(item => item.id === action.payload.id);

            if (findItem) findItem.count++;
            else state.items.push({...action.payload, count: 1});

            state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
            state.totalBurgers = state.items.reduce((sum, item) => item.count + sum, 0);
        },
        increaseCount(state, action) {
            const findItem = state.items.find(item => item.id === action.payload)
            findItem.count++;

            state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
            state.totalBurgers = state.items.reduce((sum, item) => item.count + sum, 0);
        },
        decreaseCount(state, action) {
            const findItem = state.items.find(item => item.id === action.payload)
            findItem.count--;

            state.totalPrice = state.items.reduce((sum, item) => item.price * item.count + sum, 0);
            state.totalBurgers = state.items.reduce((sum, item) => item.count + sum, 0);
        },
        deleteItem(state, action) {
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

export const { addItem, deleteItem, deleteAll, increaseCount, decreaseCount } = cartSlice.actions

export default cartSlice.reducer