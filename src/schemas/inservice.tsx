import { z } from 'zod';

export const inserviceFormSchema = z.object({
  training: z.string({
    required_error: "Inservice Training is required",
  })
  .min(1, "Inservice Training is required"),
  date: z.string().nullable().optional(),
  hours:  z.number().nullable().optional(),
  topicId: z.number().nullable().optional(),
  workshopTypeId: z.number().nullable().optional(),
  sponsor:  z.string().nullable().optional(),
  notes:  z.string().nullable().optional(),
  flag:  z.string().nullable().optional(),
  paid:  z.boolean().nullable().optional(),
  cpr: z.string().nullable().optional(),
  paidDate: z.string().nullable().optional(),
  sHarassmentExp: z.string().nullable().optional(),
  // sHarassmentExp2: z.string().nullable().optional(),
  firstAid: z.string().nullable().optional(),
  matDate: z.string().nullable().optional(),
  matApp: z.string().nullable().optional(),
  aces: z.string().nullable().optional(),
  eLaw: z.string().nullable().optional(),
  foundations: z.string().nullable().optional(),
  foundations15H: z.string().nullable().optional(),
})

export const inserviceWorkshopFormSchema = z.object({
  training: z.string({
    required_error: "Inservice Training is required",
  })
  .min(1, "Inservice Training is required"),
  date: z.string().nullable().optional(),
  hours:  z.number().nullable().optional(),
  workshopTypeId: z.number().nullable().optional(),
  sponsor:  z.string().nullable().optional(),
  notes:  z.string().nullable().optional(),
  flag:  z.string().nullable().optional(),
  paid:  z.boolean().nullable().optional(),
  cpr: z.string().nullable().optional(),
  paidDate: z.string().nullable().optional(),
  sHarassmentExp: z.string().nullable().optional(),
  // sHarassmentExp2: z.string().nullable().optional(),
  firstAid: z.string().nullable().optional(),
  matDate: z.string().nullable().optional(),
  matApp: z.string().nullable().optional(),
  aces: z.string().nullable().optional(),
  eLaw: z.string().nullable().optional(),
  foundations: z.string().nullable().optional(),
  foundations15H: z.string().nullable().optional(),
  personnelIds: z.array(z.number()).nullable().optional(),
  topicIds: z.array(z.number()).nullable().optional(),
})