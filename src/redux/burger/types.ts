export type BurgerItemType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    steak: number[];
    types: number[];
}

export interface BurgerSliceState {
    burgers: BurgerItemType[];
    oneBurger: BurgerItemType | null;
    status: Status;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}