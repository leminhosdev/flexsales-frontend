import { Client } from "./ClientModel";

export interface Product{
    id?: String;
    code?: String;
    name: String;
    commission: Number;
    price: Number;
    taxes: Number;
    amount: Number;
    clientOwner?: Client;
}