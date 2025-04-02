import { z } from 'zod';

export const contactFormSchema = z.object({
    date: z.string({
        required_error: "Date is required",
    }).min(1, "Date is required"),
    name: z.string({
        required_error: "Name is required",
    }).min(1, "Name is required"),
    notes:  z.string().nullable().optional(),
    child:  z.string().nullable().optional(),
    contact:  z.string().nullable().optional(),

});