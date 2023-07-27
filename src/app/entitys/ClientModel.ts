import { ExcelFile } from "./ExcelFileModel";

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
}