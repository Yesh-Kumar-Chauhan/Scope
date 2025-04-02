export interface IContact {
    contactID: number;
    siteID: number;
    date: string | null;
    name: string;
    child: string;
    contact: string;
    situation: string;
}


export interface IContactTable {
    date: number;
    name: string;
    [key: string]: any;
}