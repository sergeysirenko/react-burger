import { createSlice } from '@reduxjs/toolkit';
import {BurgerSliceState, Status} from "./types";
import {fetchBurgers, fetchOneBurger} from "./asyncActions";

const initialState: BurgerSliceState = {
    burgers: [],
    oneBurger: null,
    status: Status.LOADING, // loading, success, error
};

export const burgerSlice = createSlice({
    reducers: {},
    name: 'burger',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchBurgers.pending, (state) => {
            state.status = Status.LOADING;
            state.burgers = [];
        })

        builder.addCase(fetchBurgers.fulfilled, (state, action) => {
            state.burgers = action.payload;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchBurgers.rejected, (state) => {
            state.status = Status.ERROR;
            state.burgers = [];
        })

        builder.addCase(fetchOneBurger.pending, (state) => {
            state.status = Status.LOADING;
            state.oneBurger = null;
        })

        builder.addCase(fetchOneBurger.fulfilled, (state, action) => {
            state.oneBurger = action.payload;
            state.status = Status.SUCCESS;
        })

        builder.addCase(fetchOneBurger.rejected, (state) => {
            state.status = Status.ERROR;
            state.oneBurger = null;
        })
    }
});

export default burgerSlice.reducer