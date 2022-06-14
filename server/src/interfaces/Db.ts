export interface User {
    id?: number;
    token?: string;
    username: string;
    password?: string;
}

export interface UserBalance {
    id?: number;
    userId: number;
    balance: number;
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