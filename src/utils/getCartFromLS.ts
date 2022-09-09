import {calcTotalPrice} from "./calcTotalPrice";
import {calcTotalBurgers} from "./calcTotalBurgers";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);
    const totalBurgers = calcTotalBurgers(items);

    return {
        items,
        totalPrice,
        totalBurgers,
    }
}