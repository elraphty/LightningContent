import mongoose from 'mongoose';
export interface User {
    _id?: mongoose.Schema.Types.ObjectId;
    token?: string;
    username: string;
    password?: string;
    pubkey?: string;
    details?: UserDetails;
    __v?: number;
}

export interface UserBalance {
    _id?: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
    usd?: number;
    eur?: number;
    ngn?: number;
    ghs?: number;
}

export interface UserDetails {
    _id?: mongoose.Schema.Types.ObjectId;
    user: mongoose.Schema.Types.ObjectId;
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