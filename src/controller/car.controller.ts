import { Request, Response } from "express";
import carServiceImpl from "../service/impl/car.service.impl";
import { carSchema, carUpdateSchema } from "../schemas/car.schema";
import { IdSchema } from "../schemas/id.schema";
import { ZodError } from "zod";

export namespace CarController {
    export const createCar = async (req: Request, res: Response): Promise<Response> => {
        try {
            const carBody = carSchema.parse(req.body);
            const createCar = await carServiceImpl.createCar(carBody);
            return res.status(201).json(createCar);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: `Validation failed: ${error.message}` });
            }
            return res.status(400).json({ message: `Error creating car: ${error}` });
        }
    }

    export const findAllCars = async (req: Request, res: Response): Promise<Response> => {
        try {
            const cars = await carServiceImpl.findAllCars();
            return res.status(200).json(cars);
        } catch (error) {
            return res.status(400).json({ message: `Error finding cars: ${error}` });
        }
    }

    export const listAvailableCars = async (req: Request, res: Response): Promise<Response> => {
        try {
            const carsAvailable = await carServiceImpl.listAvailableCars();
            return res.status(200).json(carsAvailable);
        } catch (error) {
            return res.status(500).json({ message: `Error listing available cars: ${error}` });
        }
    }

    export const findByIdCar = async (req: Request, res: Response): Promise<Response> => {
        try {
            const idParam = IdSchema.parse(req.params).id;
            const car = await carServiceImpl.findByIdCar(idParam);
            return res.status(200).json(car);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: `Validation failed: ${error.message}` });
            }
            return res.status(400).json({ message: `Error finding car: ${error}` });
        }
    }

    export const updateCar = async (req: Request, res: Response): Promise<Response> => {
        try {
            const idParam = IdSchema.parse(req.params).id;
            const carBody = carUpdateSchema.parse(req.body);
            const updateCar = await carServiceImpl.updateCar(idParam, carBody);
            return res.status(200).json(updateCar);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: `Validation failed: ${error.message}` });
            }
            return res.status(400).json({ message: `Error updating car: ${error}` });
        }
    }

    export const deleteCar = async (req: Request, res: Response): Promise<Response> => {
        try {
            const idParam = IdSchema.parse(req.params).id;
            const deleteCar = await carServiceImpl.deleteCar(idParam);
            return res.status(200).json({ message: `Car deleted successfully`, car: deleteCar });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ message: `Validation failed: ${error.message}` });
            }
            return res.status(400).json({ message: `Error deleting car: ${error}` });
        }
    }
}