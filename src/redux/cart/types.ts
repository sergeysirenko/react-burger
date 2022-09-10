export type CartItemType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    steak: number;
    types: string;
    count: number;
}

export interface CartSliceState {
    totalPrice: number;
    totalBurgers: number;
    items: CartItemType[]
}