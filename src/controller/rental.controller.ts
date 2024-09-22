import { Request, Response } from "express";
import { rentalSchema, rentalUpdateSchema } from "../schemas/rental.schema";
import { IdSchema } from "../schemas/id.schema";
import { ZodError } from "zod";
import rentalService from "../service/impl/rental.service.impl";

export namespace RentalController {
    export const createRental = async (req: Request, res: Response): Promise<Response> => {
        try {
            const rentalBody = rentalSchema.parse(req.body);
            const createRental = await rentalService.createRental(rentalBody);
            return res.status(201).json(createRental);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error("Validation failed");
            }
            throw new Error(`Error creating rental: ${error}`);
        }
    }

    export const listAllRentals = async (req: Request, res: Response): Promise<Response> => {
        try {
            const listAllRentals = await rentalService.findAllRentals();
            return res.status(200).json(listAllRentals);
        } catch (error) {
            if(error instanceof ZodError) {
                throw new Error("Validation failed");
            }
            throw new Error(`Error finding rentals: ${error}`);
        }
    }

    export const listRentalById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const idParam = IdSchema.parse(req.params).id;
            const listRentalById = await rentalService.findByIdRental(idParam);
            return res.status(200).json(listRentalById);
        } catch (error) {
            if(error instanceof ZodError) {
                throw new Error("Validation failed");
            }
            throw new Error(`Error finding rental: ${error}`);
        }
    }

    export const updateRental = async (req: Request, res: Response): Promise<Response> => {
        try {
            const idParam = IdSchema.parse(req.params).id;
            const rentalBody = rentalUpdateSchema.parse(req.body);
            const updateRental = await rentalService.updateRental(idParam, rentalBody);
            return res.status(200).json(updateRental);
        } catch (error) {
            if(error instanceof ZodError) {
                throw new Error("Validation failed");
            }
            throw new Error(`Error updating rental: ${error}`);
        }
    }

    export const deleteRental = async (req: Request, res: Response): Promise<Response> => {
        try {
            const idParam = IdSchema.parse(req.params).id;
            const deleteRental = await rentalService.deleteRental(idParam);
            return res.status(200).json({ message: `Rental deleted successfully`, rental: deleteRental });
        } catch (error) {
            if(error instanceof ZodError) {
                throw new Error("Validation failed");
            }
            throw new Error(`Error deleting rental: ${error}`);
        }
    }
}