export interface IWorkshop {
    workshopID: number;
    date: string | null;
    workshopName: string;
    sponsor: string;
    paid: boolean;
    paidDate: string | null;
    typeID: number;
    hours: number;
    topicIds: [];
    personIds: [];

    workshopTopics?: {  // Optional since it might not always exist in the POST body
        workshopTopicID: number;
        workshopID: number;
        topicID: number;
    }[];

    workshopMembers?: {
        workshopMemberID: number;
        workshopID: number;
        personID: number;
    }[];
}

export interface IWorkshopTable {
    date: string | null;
    workshop: string;
    topicsName: string;
    topicsId: number;
    member: number;
    [key: string]: any;
}