import { Client } from "./ClientModel";

export interface Product{
    id?: String;
    code: String;
    name: String;
    comission: Number;
    price: Number;
    taxes: Number;
    clientOwner: Client;
}