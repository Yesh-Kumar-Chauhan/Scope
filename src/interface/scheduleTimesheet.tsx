import { IPersonnel } from "./Personnel";
import { ISite } from "./Sites";

export interface ISchedularTimesheet {
    id?: number;
    scheduleId?: number;
    personID?: number;
    siteID?: number;
    siteType?: string;
    position?: string;
    date?: string;           
    timeIn?: string;         
    timeOut?: string;        
    lunchIn?: string;       
    lunchOut?: string;      
    additionalStart?: string; 
    additionalStop?: string;  
    personel?: IPersonnel;    
    schedule?: any;           
    site?: ISite;            
  }