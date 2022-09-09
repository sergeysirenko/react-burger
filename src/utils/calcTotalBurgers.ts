import {CartItemType} from "../redux/slices/cartSlice";

export const calcTotalBurgers = (items: CartItemType[]) => {
    return items.reduce((sum, item) => item.count + sum, 0);
}