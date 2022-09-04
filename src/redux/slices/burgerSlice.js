import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const fetchBurgers = createAsyncThunk('burger/fetchBurgersStatus', async (params, thunkAPI) => {
    const { sortBy, order, category, search, currentPage } = params;
    let mockApiUrl = 'https://62f514e6535c0c50e769599a.mockapi.io/burgers';
    const { data } = await axios.get(
        `${mockApiUrl}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data;
})

export const fetchOneBurger = createAsyncThunk('burger/fetchOneBurger', async (id, thunkAPI) => {
    const { data } = await axios.get(`https://62f514e6535c0c50e769599a.mockapi.io/burgers/${id}`);
    return data;
})

const initialState = {
    burgers: [],
    oneBurger: {},
    status: 'loading', // loading, success, error
};

export const burgerSlice = createSlice({
    name: 'burger',
    initialState,
    extraReducers: {
        [fetchBurgers.pending]: (state) => {
            state.status = 'loading';
            state.burgers = [];
        },
        [fetchBurgers.fulfilled]: (state, action) => {
            state.burgers = action.payload;
            state.status = 'success';
        },
        [fetchBurgers.rejected]: (state) => {
            state.status = 'error';
            state.burgers = [];
        },
        [fetchOneBurger.pending]: (state) => {
            state.status = 'loading';
            state.oneBurger = {};
        },
        [fetchOneBurger.fulfilled]: (state, action) => {
            state.oneBurger = action.payload;
            state.status = 'success';
        },
        [fetchOneBurger.rejected]: (state) => {
            state.status = 'error';
            state.oneBurger = {};
        },
    }
});

export const selectBurgersData = (state) => state.burger;
export const selectBurger = (state) => state.burger.oneBurger;

export default burgerSlice.reducer