
export interface IPersonnel {
  closed: any;
  personalID: number,
  stafF_ID: number,
  ssn: string,
  lastname: string,
  firstname: string,
  mi: string,
  street: string,
  city: string,
  state: string,
  zipcode: string,
  homephone: string,
  workphone: string,
  otherphone: string,
  doemp: string | null;
  doterm: string | null,
  dob: string | null,
  wpreq: boolean,
  wprec: boolean,
  clR2BMAIL: string | null,
  clearmail: string | null,
  clearrec: string | null,
  app: boolean,
  w4: boolean,
  i9: boolean,
  medicalexp: string | null,
  tineexp: string | null,
  reF_P_OUT: string | null,
  reF_P_REC: string | null,
  reF_W1_OUT: string | null,
  reF_W1_REC: string | null,
  reF_W2_OUT: string | null,
  reF_W2_REC: string | null,
  fingercnty: string,
  sitE_NUM_B: number,
  sitE_NAM_B: string,
  sitE_POS_B: string,
  sitE_NUM_D: number,
  sitE_NAM_D: string,
  sitE_POS_D: string,
  sitE_NUM_A: number,
  sitE_NAM_A: string,
  sitE_POS_A: string,
  moN_1_B: string,
  moN_1_E: string,
  moN_2_B: string,
  moN_2_E: string,
  moN_3_B: string,
  moN_3_E: string,
  tuE_1_B: string,
  tuE_1_E: string,
  tuE_2_B: string,
  tuE_2_E: string,
  tuE_3_B: string,
  tuE_3_E: string,
  weD_1_B: string,
  weD_1_E: string,
  weD_2_B: string,
  weD_2_E: string,
  weD_3_B: string,
  weD_3_E: string,
  thU_1_B: string,
  thU_1_E: string,
  thU_2_B: string,
  thU_2_E: string,
  thU_3_B: string,
  thU_3_E: string,
  frI_1_B: string,
  frI_1_E: string,
  frI_2_B: string,
  frI_2_E: string,
  frI_3_B: string,
  frI_3_E: string,
  paY_RATE_B: number,
  seP_PAY_RATE_B: number,
  jaN_PAY_RATE_B: number,
  salarY_B: number,
  maX_HRS_B: number,
  paY_RATE_D: number,
  seP_PAY_RATE_D: number,
  jaN_PAY_RATE_D: number,
  salarY_D: number,
  maX_HRS_D: number,
  paY_RATE_A: number,
  seP_PAY_RATE_A: number,
  jaN_PAY_RATE_A: number,
  salarY_A: number,
  maX_HRS_A: number,
  comments: string,
  idca: boolean,
  education: string,
  daysoff: number,
  allused: boolean,
  datesused: string,
  referedby: string,
  statE_FPC: string | null;
  statE_FPR: string | null;
  hireletter: boolean,
  cntY_FPC: string | null;
  cntY_FPR: string | null;
  reF_P_FON: string | null;
  reF_W1_FON: string | null;
  reF_W2_FON: string | null;
  iD1: boolean,
  iD2: boolean,
  maX_ADD_B: number,
  maX_ADD_D: number,
  maX_ADD_A: number,
  dsS_POS: string,
  absences: string,
  nysid: string,
  gender: string,
  daysused: number,
  perC_B: number,
  perC_D: number,
  perC_A: number,
  matapp: string | null;
  cpr: string | null;
  firstaid: string | null;
  matdate: string | null;
  raiseeffb: string | null;
  raiseeffd: string | null;
  raiseeffa: string | null;
  rehireable: boolean,
  comment: string,
  email: string,
  emernamE1: string,
  emerphonE1: string,
  emercelL1: string,
  emernamE2: string,
  emerphonE2: string,
  emercelL2: string,
  dayemerg: string,
  rehired: string | null;
  allottedb: number,
  allottedd: number,
  allotteda: number,
  aidefoR1: string,
  aidefoR2: string,
  aidefoR3: string,
  matStart: string | null;
  sel: string | null;
  personalFieldSupervisor: string,
  personalFieldTrainer: string,
  personalHHC: string,
  type: number,
  effectiveDateBefore: string | null;
  effectiveDateDuring: string | null;
  effectiveDateAfter: string | null;
  foundations: string | null;
  leaveOfAbsense: boolean,
  leaveStartDate: string | null,
  leaveEndDate: string | null,
  suspensionStartDate: string | null,
  suspensionEndDate: string | null,
  leaves: boolean,
  leavesStart: string | null;
  leavesEnd: string | null;
  suspension: boolean,
  suspensionStart: string | null;
  suspensionEnd: string | null;
  expungeDate: string | null,
  aloneWithChildren: boolean,
  flagType: boolean,
  sHarassmentExp: string | null,
  // sHarassmentExp2: string | null,
  cbc: string | null,
  aces: string | null;
  eLaw: string | null;
  fingerprintDate: string | null,
  foundations15H: string | null;
}

export interface ITimesheetForm {
  timesheetID: number,
  districtID: number,
  siteID: number,
  schoolID: number,
  personID: number,
  position: string;
  timeSheetDate: string | null,
  // timeIn: TimeEntry;
  timeIn: string;
  timeOut: string;
  siteTimeIn: string;
  siteTimeOut: string;
  externalEventId: number | null;
  lunchIn: string;
  additionalStart: string;
  lunchOut: string;
  additionalStop: string;
  deviceID: string;
  type: number;
  createdBy: string;
  modifiedBy: string;
  clockInLocal: string | null,
  clockOutLocal: string | null,
  notesHeader: string;
  notesDetails: string;
  paycode : string
}

export interface ITimesheetTable {
  timeSheetDate: string | null,
  districtID: number;
  siteID: number;
  timeIn: string | null,
  timeOut: string | null,
  lunchIn: string | null,
  lunchOut: string | null,
  additionalStart: string | null,
  additionalStop: string | null,
  [key: string]: any;
}

export interface ICalendar {
  id?: number;
  siteID?: number;
  personID: number;
  siteType: string | null;
  deletedSiteType?: string | null;
  position?: string;
  notes?: string;
  date?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  updatedDate?: string | null;
  deletedDate?: string | null;
  // timeIn?: string;
  // timeOut?: string;
  // lunchIn?: string;
  // lunchOut?: string;
  // additionalStart?: string;
  // additionalStop?: string;
  siteName?: string;
  distNumber?: string;
  distName?: string;

  // TimeIn and TimeOut for each day of the week
  mondayTimeIn?: string | null;
  mondayTimeOut?: string | null;
  
  tuesdayTimeIn?: string | null;
  tuesdayTimeOut?: string | null;
  
  wednesdayTimeIn?: string | null;
  wednesdayTimeOut?: string | null;
  
  thursdayTimeIn?: string | null;
  thursdayTimeOut?: string | null; 
  
  fridayTimeIn?: string | null;
  fridayTimeOut?: string | null;
  paycode? : string;
  paycodeRequired?: boolean;
  // Add any other fields
  [key: `${string}TimeIn` | `${string}TimeOut`] : any;
  scheduleType? : string
  selectedScheduleType? : string
}

export interface ISchedularTable {
  id: number,
  date: string | null;
  timeIn: string;
  timeOut: string;
  [key: string]: any;
}


export interface ICertificateForm {
  certificateID: number;
  certificateTypeID: number;
  personID: number;
  certificatePermanent: boolean;
  certificateProfessional: boolean;
  certificateCQ: boolean;
  initial: boolean;
  initialExpiration: string | null;
  provisional: boolean;
  provisionalExpiration: string | null;
}

export interface ICertificateTable {
  certificateTypeID: number;
  certificatePermanent: boolean;
  certificateProfessional: boolean;
  certificateCQ: boolean;
  initial: boolean;
  initialExpiration: string | null;
  provisional: boolean;
  provisionalExpiration: string | null;
  [key: string]: any;
}

export interface IAttendanceForm {
  districtID: number,
  attendanceID: number;
  staffId: number;
  date: string | null;
  reason: string;
  paid: boolean;
  charged: boolean;
  fraction: string;
  siteNumber: number;
  siteName: string;
  reasonID: number;
  scheduleId:string;
}

export interface IAttendanceTable {
  attendanceID: number;
  staffId: number;
  date: string | null;
  reason: string;
  paid: boolean;
  charged: boolean;
  fraction: string;
  siteNumber: number;
  siteName: string;
  reasonID: number;
  [key: string]: any; // Optional: to allow additional properties
}

export interface IWaiverForm {
  waiversSentID: number;
  staffId: number;
  sent: string | null;
}

export interface IWaiverTable {
  sent: string | null;
  personnelID: number;
  waiversSentID: number;
  [key: string]: any;
} 

export interface IDirector {
  personID: number; 
  siteID: number | null;
  monAMFrom: string;
  monAMTo: string;
  tueAMFrom: string;
  tueAMTo: string;
  wedAMFrom: string;
  wedAMTo: string;
  thuAMFrom: string;
  thuAMTo: string;
  friAMFrom: string;
  friAMTo: string;
  monPMFrom: string;
  monPMTo: string;
  tuePMFrom: string;
  tuePMTo: string;
  wedPMFrom: string;
  wedPMTo: string;
  thuPMFrom: string;
  thuPMTo: string;
  friPMFrom: string;
  friPMTo: string;
  distName: string;
  siteName: string;
}


