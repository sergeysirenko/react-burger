import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const fetchBurgers = createAsyncThunk('burger/fetchBurgersStatus', async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    let mockApiUrl = 'https://-62f514e6535c0c50e769599a.mockapi.io/burgers';
    const { data } = await axios.get(
        `${mockApiUrl}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
    return data;
})

const initialState = {
    burgers: [],
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
        }
    }
});

export default burgerSlice.reducer