export interface User {
    id?: number;
    token?: string;
    username: string;
    password?: string;
    details?: UserDetails;
}

export interface UserBalance {
    id?: number;
    userId: number;
    balance: number;
}

export interface UserDetails {
    id?: number;
    userId: number;
    firstname?: string;
    lastname?: string;
    image?: string;
    bio?: string;
    url?: string;
}

export interface TransactionLogs {
    id?: number;
    amount: number;
    txid: string;
    status: number;
    network: string;
    type: string;
    userid?: number;
}