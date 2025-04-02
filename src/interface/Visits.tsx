export interface IVisit {
        visitID: number;
        siteID: number;
        date: string | null;
        name: string;
        timein: string;
        timeout: string;
        notes: string;
        offical: boolean;
        staffing: boolean;
        problem: boolean;
        training: boolean;
        quality: boolean;
        other: boolean;
    }
    

export interface IVisitTable {
        date: number;
        name: string;
        [key: string]: any;
}