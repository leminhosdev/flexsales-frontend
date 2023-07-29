import { Client } from "./ClientModel";

export interface Product{
    id?: String;
    code: String;
    description: String;
    comission: Number;
    taxes: Number;
    clientOwner: Client;
}