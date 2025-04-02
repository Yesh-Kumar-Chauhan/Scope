export interface IInservice {
    inserviceID: number;
    staffId: number;
    training: string;
    date: string | null,
    // decimal
    hours: number;          
    topicId: number;
    workshopTypeId: number;
    sponsor: string;
    notes: string;
    flag: string;
    paid: boolean;
    paidDate: string | null;
    cpr: string | null;
    sHarassmentExp: string | null;
    // sHarassmentExp2: string | null;
    firstAid: string | null;
    matDate: string | null;
    matApp: string | null;
    aces: string | null;
    elaw: string | null;
    foundations: string | null;
    foundations15H: string | null;
}

export interface IInserviceWorkShop {
    inserviceID: number;
    training: string;
    date: string | null,
    // decimal
    hours: number;          
    topicIds: [];
    personnelIds: [];
    workshopTypeId: number;
    sponsor: string;
    notes: string;
    flag: string;
    paid: boolean;
    paidDate: string | null;
    cpr: string | null;
    sHarassmentExp: string | null;
    // sHarassmentExp2: string | null;
    firstAid: string | null;
    matDate: string | null;
    matApp: string | null;
    aces: string | null;
    elaw: string | null;
    foundations: string | null;
    foundations15H: string | null;
}

export interface IInserviceTable {
    personalID: number;
    firstname: string;
    lastname: string;
    [key: string]: any;
}