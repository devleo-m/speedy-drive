import Car from "../models/car.model";
import { CarAttributes, CarCreationAttributes } from "../interface/car.interface";

export interface ICarService {
    createCar(car: CarCreationAttributes): Promise<Car>;
    findAllCars(): Promise<Car[]>;
    findByIdCar(id: number): Promise<Car | null>;
    updateCar(id: number, car: Partial<CarAttributes>): Promise<Car | null>;
    deleteCar(id: number): Promise<void>;
}