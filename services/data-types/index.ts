export interface CategoryTypes {
    _id: string;
    name: string;
    __v: number;
}

export interface GameItemTypes {
    _id: string;
    status: string;
    name: string;
    thumbnail: string;
    category: CategoryTypes;
}

export interface NominalItemTypes {
    _id: string;
    coinQuantity: number;
    coinName: string;
    price: number;
}
