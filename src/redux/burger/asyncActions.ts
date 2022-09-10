import {createAsyncThunk} from "@reduxjs/toolkit";
import {BurgerItemType} from "./types";
import axios from "axios";

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