export type LoaderType = {
    edit?: boolean;
    delete?: boolean;
    id?:number
};

export type HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
