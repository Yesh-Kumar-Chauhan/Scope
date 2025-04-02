export interface IClosing {
    closingID: number;
    districtID: number;
    date: string | null,
    status: number;
    notes: string;
    parentCredit: boolean;
    stafF_PH: boolean;
    stafF_DT: boolean;
    staffPaid: boolean;
    makeUpDay: boolean;
}

export interface IClosingTable {
    date: string | null,
    status: number;
    parentCredit:boolean;
    staffPaid: boolean;
    makeUpDay: boolean;
    [key: string]: any;
}
