import { Client } from "./ClientModel";

export interface ExcelFile{
    id?: String;
    name: String;
    type: String;
    data: Uint8Array;
    clientOwner: Client;
}