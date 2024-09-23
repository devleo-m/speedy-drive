import { z } from "zod";

export const userSchema = z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    role: z.enum(["ADMIN", "CLIENT"]).optional().default("CLIENT"),
});

export const userUpdateSchema = z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email format" }).optional(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }).optional(),
    role: z.enum(["ADMIN", "CLIENT"]).optional(),
});