import { ExcelFile } from "./ExcelFileModel";
import { OrderEntity } from "./OrderEntityModel";

export interface Client{
    id?: String;
    clientName: String;
    email: String;
    password: String;
    clientArea: String;
    sales: number;
    profit: number;
    revenue: number;
    salesData: Date;
    excelFile: ExcelFile;
    productList: Client[];
    orderEntityList: OrderEntity[];
}