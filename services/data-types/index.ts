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

export interface LoginTypes {
    email: string;
    password: string;
}

export interface UserTypes {
    id: string;
    name: string;
    email: string;
    avatar: string;
    username: string;
    phoneNumber: string;
}

export interface JWTPayloadTypes {
    player: UserTypes;
    iat: number;
}

export interface CheckoutItemTypes {
    voucher: string;
    nominal: string;
    payment: string;
    bank: string;
    name: string;
    accountUser: string;
}

export interface CountCategoryTypes {
    _id: string;
    value: number;
    name: string;
}

export interface LatestTransactionTypes {
    _id: string;
    historyVoucherTopup: {
        gameName: string;
        category: string;
        thumbnail: string;
        coinName: string;
        coinQuantity: string;
        price: number;
    };
    historyPayment: {
        name: string;
        type: string;
        bankName: string;
        accountNumber: string;
    };
    historyUser: {
        name: string;
        phoneNumber: number;
    };
    tax: number;
    value: number;
    status: string;
    name: string;
    accountUser: string;
    player: string;
    category: string;
    user: string;
}
