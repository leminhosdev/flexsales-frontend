import { Client } from "./ClientModel";

export interface Product{
    id?: String;
    code?: String;
    name: String;
    commission: Number;
    price: number;
    taxes: Number;
    amount: number;
    totalPrice?: number;
    clientOwner?: Client;
}