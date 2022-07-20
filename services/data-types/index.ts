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

export interface BankTypes {
    _id: string;
    name: string;
    bankName: string;
    accountNumber: string;
}

export interface PaymentItemTypes {
    _id: string;
    type: string;
    status: string;
    banks: BankTypes[]
}
