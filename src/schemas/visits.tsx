import { z } from 'zod';

export const visitFormSchema = z.object({
    date: z.string({
        required_error: "Date is required",
    }).min(1, "Date is required"),
    name: z.string({
        required_error: "Name is required",
    }).min(1, "Name is required"),
    // timein: z.string({
    //     required_error: "Time In is required",
    // }).min(1, "Time In is required"),
    // timeout: z.string({
    //     required_error: "Time Out is required",
    // }).min(1, "Time Out is required"),
    timein: z.string().nullable().optional(),
    timeout: z.string().nullable().optional(),
    notes: z.string().nullable().optional(),
    offical: z.boolean().nullable().optional(),
    staffing: z.boolean().nullable().optional(),
    problem: z.boolean().nullable().optional(),
    training: z.boolean().nullable().optional(),
    quality: z.boolean().nullable().optional(),
    other: z.boolean().nullable().optional(),
});
