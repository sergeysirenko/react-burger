import {RootState} from "../store";

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterSearch = (state: RootState) => state.filter.searchValue;