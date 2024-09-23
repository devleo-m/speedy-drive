import { z } from "zod";

export const paymentSchema = z.object({
    method: z.enum(["DEBIT", "CREDIT", "PIX", "MONEY"], { message: "The payment method is required" }).optional().default("MONEY"),
    status: z.enum(["PAID", "UNPAID"], { message: "The payment status is required" }).optional().default("UNPAID"),
    paymentDate: z.coerce.date().min(new Date(), { message: "The payment date cannot be in the past" }).optional().default(new Date()),
    rentalId: z.coerce.number().min(1, { message: "The rental ID must be a positive number" }),
})

export const paymentUpdateSchema = z.object({
    method: z.enum(["DEBIT", "CREDIT", "PIX", "MONEY"], { message: "The payment method is required" }).optional(),
    status: z.enum(["PAID", "UNPAID"], { message: "The payment status is required" }).optional(),
    paymentDate: z.coerce.date().min(new Date(), { message: "The payment date cannot be in the past" }).optional(),
    rentalId: z.coerce.number().min(1, { message: "The rental ID must be a positive number" }).optional(),
})