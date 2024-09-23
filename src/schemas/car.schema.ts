import z from "zod";

export const carSchema = z.object({
    model: z.string().min(3, { message: "Model must be at least 3 characters long" }),
    brand: z.string().min(3, { message: "Brand must be at least 3 characters long" }),
    color: z.string().min(3, { message: "Color must be at least 3 characters long" }),
    year: z.coerce.number()
        .int({ message: "Year must be an integer: 2000, 2010, 2020..." })
        .max(new Date().getFullYear(), { message: `Year must be less than or equal to ${new Date().getFullYear()}` })
        .min(1886, { message: "Year must be a valid year" }),
    plate: z.string().regex(/^[A-Z]{3}-[0-9]{4}$/, { message: "Plate must follow the pattern XXX-0000" }),
    dailyRate: z.coerce.number().min(0, { message: "Daily rate must be a positive number" }),
    status: z.enum(["AVAILABLE", "UNAVAILABLE"]).optional().default("AVAILABLE"),
});

export const carUpdateSchema = z.object({
    model: z.string().min(3, { message: "Model must be at least 3 characters long" }).optional(),
    brand: z.string().min(3, { message: "Brand must be at least 3 characters long" }).optional(),
    color: z.string().min(3, { message: "Color must be at least 3 characters long" }).optional(),
    year: z.coerce.number()
        .int({ message: "Year must be an integer: 2000, 2010, 2020..." })
        .max(new Date().getFullYear(), { message: `Year must be less than or equal to ${new Date().getFullYear()}` })
        .min(1886, { message: "Year must be a valid year" }).
        optional(),
    plate: z.string().regex(/^[A-Z]{3}-[0-9]{4}$/, { message: "Plate must follow the pattern XXX-0000" }).optional(),
    dailyRate: z.coerce.number().min(0, { message: "Daily rate must be a positive number" }).optional(),
    status: z.enum(["AVAILABLE", "UNAVAILABLE"]).optional().default("AVAILABLE"),
});