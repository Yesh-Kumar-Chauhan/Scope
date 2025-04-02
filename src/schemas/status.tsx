import { z } from 'zod';
export const statusFormSchema = z.object({
    statusName: z.string({
        required_error: "Name is required",
    }).min(1, "Number is required"),
    hidden: z.boolean().nullable().optional(),
})