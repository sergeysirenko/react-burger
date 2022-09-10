import {RootState} from "../store";

export const selectBurgersData = (state: RootState) => state.burger;
export const selectBurger = (state: RootState) => state.burger.oneBurger;