import { z } from 'zod';

export const districtSchema = z.object({
    distNum: z.union([
        z.string().min(1, 'District Number is required').transform(val => parseFloat(val)),
        z.number().min(1, 'District Number is required')
    ]),
    county: z.string().min(1, 'County is required'),
    emailsuper: z.string()
        .optional().nullable()
        .refine((value) => !value || z.string().email().safeParse(value).success, {
            message: "Invalid email address",
        }),
    lEmail1: z.string()
        .optional().nullable()
        .refine((value) => !value || z.string().email().safeParse(value).success, {
            message: "Invalid email address",
        }),
    lEmail2: z.string()
        .optional().nullable()
        .refine((value) => !value || z.string().email().safeParse(value).success, {
            message: "Invalid email address",
        }),
});
