import {CartItemType} from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItemType[]) => {
    return Number(items.reduce((sum, item) => item.price * item.count + sum, 0).toFixed(2));
}