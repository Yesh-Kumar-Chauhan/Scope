import { z } from 'zod';

export const schoolFormSchema = z.object({
    schNum: z.string({
        required_error: "School Number is required",
    }).min(1, "School Number is required"),
    schNam: z.string({
        required_error: "School Name is required",
    }).min(1, "School Name is required"),
    principal: z.string().nullable().optional(),
    addr1: z.string().nullable().optional(),
    districtId: z.number().optional().nullable().optional(),
    addr2: z.string().nullable().optional(),
    distNum: z.string().nullable().optional(),
    distNam: z.string().nullable().optional(),
    siteNum: z.string().nullable().optional(),
    siteNam: z.string().nullable().optional(),
    dismisal: z.string().nullable().optional(),
    trans: z.string().nullable().optional(),
    email: z.string()
    .optional().nullable()
    .refine((value) => !value || z.string().email().safeParse(value).success, {
      message: "Invalid email address",
    }),
    hidden: z.boolean().nullable().optional(),
    notes: z.string().nullable().optional(),
})