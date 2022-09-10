import {CartItemType} from "../redux/cart/types";

export const calcTotalBurgers = (items: CartItemType[]) => {
    return items.reduce((sum, item) => item.count + sum, 0);
}