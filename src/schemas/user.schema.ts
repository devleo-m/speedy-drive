import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    role: z.enum(["ADMIN", "CLIENT"], { message: "Role must be either ADMIN or CLIENT" }),
});

export const findUserIdShema = z.object({
    id: z.number({ message: "Id must be a number" }),
})