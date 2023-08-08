import { Client } from "./ClientModel";
import { Product } from "./Product.Model";

export interface OrderEntity{
    id?: String;
    name?: String;
    totalPrice: number;
    salesData: Date;
    productsAmount: number;
    totalTaxesValue: number;
    totalCommissionValue: number;
    clientOrderOwner?: Client;
    productList: Product[];
}