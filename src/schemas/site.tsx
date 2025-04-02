import { z } from 'zod';

export const siteFormSchema = z.object({
  siteNumber: z.union([
    z.string().min(1, 'Site Number is required!').transform(val => parseFloat(val)),
    z.number().int().min(1, 'Site Number is required!')
  ]),
  siteName: z.string().nullable().optional(),
  permit: z.string().nullable().optional(),
  issued: z.string().nullable().optional(),
  expires: z.string().nullable().optional(),
  address1: z.string().nullable().optional(),
  address2: z.string().nullable().optional(),
  address3: z.string().nullable().optional(),
  principal: z.string().nullable().optional(),
  schoolPhone: z.string().nullable().optional(),
  sFax: z.string().nullable().optional(),
  parentEmail: z.string().nullable().optional(),
  gradeLevels: z.string().nullable().optional(),
  startTime: z.string().nullable().optional(),
  stopTime: z.string().nullable().optional(),
  started: z.string().nullable().optional(),
  closed: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  waiverExp: z.string().nullable().optional(),
  preKindergarten: z.boolean().nullable().optional(),
  universalPreKindergarten: z.string().nullable().optional(),
  // type: z.string().nullable().optional(), f
  class: z.string().nullable().optional(),
  when: z.string().nullable().optional(),
  // capacity: z.string().nullable().optional(),
  // siteCapacity: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  timeAvailable: z.string().nullable().optional(),
  scopeEmail: z.string().nullable().optional(),
  scopeFax: z.string().nullable().optional(),
  nurseVisit: z.string().nullable().optional(),
  secondNurseVisit: z.string().nullable().optional(),
  thirdNurseVisit: z.string().nullable().optional(),
  midPoint: z.string().nullable().optional(),
  additionalLocation: z.string().nullable().optional(),
  additionalLocation2: z.string().nullable().optional(),
  additionalLocation3: z.string().nullable().optional(),
  additionalLocation4: z.string().nullable().optional(),
  // caP1: z.string(),
  // caP2: z.string(),
  // caP3: z.string(),
  // caP4: z.string(),
  // full: z.string(),
  // daily: z.string(),
  // min: z.string(),
  // ampm: z.string(),
  policeName: z.string().nullable().optional(),
  policePhone: z.string().nullable().optional(),
  policeAddress1: z.string().nullable().optional(),
  policeAddress2: z.string().nullable().optional(),
  policeAddress3: z.string().nullable().optional(),
  fireName: z.string().nullable().optional(),
  firePhone: z.string().nullable().optional(),
  fireAddress1: z.string().nullable().optional(),
  fireAddress2: z.string().nullable().optional(),
  fireAddress3: z.string().nullable().optional(),
  landlineLocation: z.string().nullable().optional(),
  dssRep: z.string().nullable().optional(),
  dssPhone: z.string().nullable().optional(),
  transport: z.string().nullable().optional(),
  transportPhone: z.string().nullable().optional(),
  security: z.string().nullable().optional(),
  securityPhone: z.string().nullable().optional(),
  safePlace: z.string().nullable().optional(),
  ossPlace: z.string().nullable().optional(),
  ambulancePhone: z.string().nullable().optional(),
  lockdown: z.string().nullable().optional(),
  emergency: z.string().nullable().optional(),
  additionalEmergencyInfo: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  fieldSupervisorName: z.string().nullable().optional(),

});

export const basicInfoSchema = z.object({
  siteNumber: z.number({  
    required_error: "Site Number is required",
  }).min(1, "Site Number must\nbe greater than 0"),

  siteName: z.string({
    required_error: "Site Name is required",
  }).min(1, "Site Name cannot be empty"),  // This ensures that the string is not empty

  permit: z.string().nullable().optional(),
  issued: z.string().nullable().optional(),
  expires: z.string().nullable().optional(),
  address1: z.string().nullable().optional(),
  address2: z.string().nullable().optional(),
  address3: z.string().nullable().optional(),
  principal: z.string().nullable().optional(),
  schoolPhone: z.string().nullable().optional(),
  sFax: z.string().nullable().optional(),
  parentEmail:z.string()
  .optional().nullable()
  .refine((value) => !value || z.string().email().safeParse(value).success, {
    message: "Invalid email address",
  }),
  gradeLevels: z.string().nullable().optional(),
  startTime: z.string().nullable().optional(),
  stopTime: z.string().nullable().optional(),
  started: z.string().nullable().optional(),
  closed: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  waiverExp: z.string().nullable().optional(),
  preKindergarten: z.boolean().nullable().optional(),
  universalPreKindergarten: z.boolean().nullable().optional(),
  type: z.number().nullable().optional(),
  class: z.string().nullable().optional(),
  when: z.string().nullable().optional(),
  capacity: z.number().nullable().optional(),
  siteCapacity: z.number().nullable().optional(),
  phone: z.string().nullable().optional(),
  timeAvailable: z.string().nullable().optional(),
  scopeEmail: z.string()
  .optional().nullable()
  .refine((value) => !value || z.string().email().safeParse(value).success, {
    message: "Invalid email address",
  }),
  scopeFax: z.string().nullable().optional(),
  nurseVisit: z.string().nullable().optional(),
  secondNurseVisit: z.string().nullable().optional(),
  thirdNurseVisit: z.string().nullable().optional(),
  midPoint: z.string().nullable().optional(),
  additionalLocation: z.string().nullable().optional(),
  additionalLocation2: z.string().nullable().optional(),
  additionalLocation3: z.string().nullable().optional(),
  additionalLocation4: z.string().nullable().optional(),
  caP1: z.number().nullable().optional(),
  caP2: z.number().nullable().optional(),
  caP3: z.number().nullable().optional(),
  caP4: z.number().nullable().optional(),
  full: z.number().nullable().optional(),
  daily: z.number().nullable().optional(),
  min: z.number().nullable().optional(),
  ampm: z.number().nullable().optional(),
});

export const additionalInfoSchema = z.object({
    policeName: z.string().nullable().optional(),
    policePhone: z.string().nullable().optional(),
    policeAddress1: z.string().nullable().optional(),
    policeAddress2: z.string().nullable().optional(),
    policeAddress3: z.string().nullable().optional(),
    
    fireName: z.string().nullable().optional(),
    firePhone: z.string().nullable().optional(),
    fireAddress1: z.string().nullable().optional(),
    fireAddress2: z.string().nullable().optional(),
    fireAddress3: z.string().nullable().optional(),
    
    landlineLocation: z.string().nullable().optional(),
    dssRep: z.string().nullable().optional(),
    dssPhone: z.string().nullable().optional(),
    
    transport: z.string().nullable().optional(),
    transportPhone: z.string().nullable().optional(),
    
    security: z.string().nullable().optional(),
    securityPhone: z.string().nullable().optional(),
    
    safePlace: z.string().nullable().optional(),
    ossPlace: z.string().nullable().optional(),
    ambulancePhone: z.string().nullable().optional(),
    
    evacuation1Location: z.string().nullable().optional(),
    evacuation1Phone: z.string().nullable().optional(),
    evacuation1Address1: z.string().nullable().optional(),
    evacuation1Address2: z.string().nullable().optional(),
    evacuation1Address3: z.string().nullable().optional(),
    
    evacuation2Location: z.string().nullable().optional(),
    evacuation2Phone: z.string().nullable().optional(),
    evacuation2Address1: z.string().nullable().optional(),
    evacuation2Address2: z.string().nullable().optional(),
    evacuation2Address3: z.string().nullable().optional(),
    
    lockdown: z.string().nullable().optional(),
    emergency: z.string().nullable().optional(),
    additionalEmergencyInfo: z.string().nullable().optional(),
});

export const assignmentSchema = z.object({
  assignment: z.string().nonempty({ message: "Assignment is required" }),
  // Other fields for step 3
});


export const siteAssignmentSchema = z.object({
  name:z.string({
    required_error: "Name is required!",
  }).min(1, "Name is required"),
  cell:z.string({
    required_error: "Cell is required!",
  }).min(1, "Cell is required"),
  ext: z.string().nullable().optional(),
  fax: z.string().nullable().optional(),
  email:z.string({
    required_error: "Email is required!",
  }).min(1, "Email is required").email({ message: "Invalid email address" }),
  forms: z.string().nullable().optional(),
  others: z.string().nullable().optional(),
});