import Car from "../models/car.model";
import { CarAttributes, CarCreationAttributes } from "../interface/car.interface";

export interface ICarRepository {
    createCar(car: CarCreationAttributes): Promise<Car>;
    findAllCars(): Promise<Car[]>;
    findAllAvailableCars(): Promise<Car[]>;
    findByIdCar(id: number): Promise<Car | null>;
    updateCar(id: number, car: Partial<CarAttributes>): Promise<Car | null>;
    deleteCar(id: number): Promise<void>;
}