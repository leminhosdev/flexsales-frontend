
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
    excelTable: File;
}