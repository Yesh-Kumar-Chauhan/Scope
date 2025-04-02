export interface ISchool {
    schoolID: number,
    schNum: string,
    schNam: string,
    principal: string,
    addr1: string,
    addr2: string,
    districtId?: number,
    distNum: string,
    distNam: string,
    siteNum: string,
    siteNam: string,
    dismisal: string,
    trans: string,
    email: string,
    hidden: boolean,
    notes: string
}
export interface ISchoolTable {
    schNum: number;
    schNam: string;
    permit: string;
    [key: string]: any;
}
