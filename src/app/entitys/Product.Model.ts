import { Client } from "./ClientModel";
import { OrderEntity } from "./OrderEntityModel";

export interface Product{
    id?: String;
    code?: String;
    name: String;
    commission: number;
    price: number;
    taxes: number;
    amount: number;
    totalPrice: number;
    clientOwner?: Client;
    orderEntity?: OrderEntity;
}