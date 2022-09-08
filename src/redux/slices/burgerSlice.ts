import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import {RootState} from "../store";

export type BurgerItemType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    steak: number[];
    types: number[];
}

interface BurgerSliceState {
    burgers: BurgerItemType[];
    oneBurger: BurgerItemType | null;
    status: Status;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export const fetchBurgers = createAsyncThunk<BurgerItemType[], Record<string, string>>(
    'burger/fetchBurgersStatus',
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        let mockApiUrl = 'https://62f514e6535c0c50e769599a.mockapi.io/burgers';
        const { data } = await axios.get<BurgerItemType[]>(
            `${mockApiUrl}?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
        );
        return data;
    }
)

export const fetchOneBurger = createAsyncThunk<BurgerItemType, string>(
    'burger/fetchOneBurger',
    async (id) => {
        const { data } = await axios.get<BurgerItemType>(`https://62f514e6535c0c50e769599a.mockapi.io/burgers/${id}`);
        return data;
    }
)

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

export const selectBurgersData = (state: RootState) => state.burger;
export const selectBurger = (state: RootState) => state.burger.oneBurger;

export default burgerSlice.reducer