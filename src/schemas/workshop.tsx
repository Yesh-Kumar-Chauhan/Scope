import { z } from 'zod';

export const workshopFormSchema = z.object({
    date: z.string().nullable().nullable().optional(),
    workshopName:  z.string({
        required_error: "Workshop is required!",
      }).min(1, "Workshop is required!"),
    sponsor: z.string().nullable().optional(),
    paid: z.boolean().nullable().optional(),
    paidDate: z.string().nullable().optional(),
    hours: z.number().nullable().optional(),
    topicIds: z.array(z.number()).nullable().optional(),
    personIds: z.array(z.number()).nullable().optional(),
})