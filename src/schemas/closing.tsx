import { z } from 'zod';
export const closingFormSchema = z.object({
    date:  z.string({
        required_error: "Date is required",
      })
      .min(1, "Date is required"),
    // date: z.string()
    //     .nullable()
    //     .refine((val) => val !== null && val.trim() !== '', {
    //         message: "Date is required", // Full custom message
    //     }),
    status:z.number().nullable().optional(),
    notes:  z.string().nullable().optional(),
    parentCredit: z.boolean().nullable().optional(),
    stafF_PH: z.boolean().nullable().optional(),
    stafF_DT: z.boolean().nullable().optional(),
    staffPaid: z.boolean().nullable().optional(),
    makeUpDay: z.boolean().nullable().optional(),
})