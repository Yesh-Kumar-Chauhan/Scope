
export interface ValidationErrors {
    [key: string]: {
        _errors: string[];
    } | null;
}
