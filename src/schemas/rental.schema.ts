import { z } from 'zod';

export const rentalSchema = z.object({
    startDate: z.date().min(new Date(), { message: "The start date cannot be in the past" }),
    endDate: z.date().min(new Date(), { message: "The end date cannot be in the past" }),
    price: z.coerce.number().min(0, { message: "The price must be a positive number" }),
    userId: z.coerce.number().min(1, { message: "The user ID must be a positive number" }),
    carId: z.coerce.number().min(1, { message: "The car ID must be a positive number" }),
}).refine((data) => data.endDate > data.startDate, {
    message: "The end date must be after the start date",
    path: ['endDate']
});

export const rentalUpdateSchema = z.object({
    startDate: z.date().min(new Date(), { message: "The start date cannot be in the past" }).optional(),
    endDate: z.date().min(new Date(), { message: "The end date cannot be in the past" }).optional(),
    price: z.coerce.number().min(0, { message: "The price must be a positive number" }).optional(),
    userId: z.coerce.number().min(1, { message: "The user ID must be a positive number" }).optional(),
    carId: z.coerce.number().min(1, { message: "The car ID must be a positive number" }).optional(),
}).refine((data) => {
    if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
    }
    return true;
}, {
    message: "The end date must be after the start date",
    path: ['endDate'],
});
