import { ISite } from "../interface/Sites";

export type AssignmentDescription = 
    | "District Manager"
    | "Registrar"
    | "Time Sheets"
    | "Food Contact"
    | "Supply Contact"
    | "Special Event Contact"
    | "Field Trainer"
    | "Healthcare Consultant"
    | "Account Billing"
    | "Staffing/Substitutes";
    
export type SiteFieldKeys = keyof ISite;