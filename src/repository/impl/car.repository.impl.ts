import Car from "../../models/car.model";
import { CarCreationAttributes, CarAttributes } from "../../interface/car.interface";
import { ICarRepository } from "../car.repository";

class UserRepositoy implements ICarRepository {
    async createCar(car: CarCreationAttributes): Promise<Car> {
        try {
            return await Car.create(car);
        } catch (error) {
            throw new Error(`Failed to create car: ${error}`);
        }
    }

    async findAllCars(): Promise<Car[]> {
        try {
            return await Car.findAll();
        } catch (error) {
            throw new Error(`Failed to retrieve cars: ${error}`);
        }
    }

    async findByIdCar(id: number): Promise<Car | null> {
        try {
            return await Car.findByPk(id);
        } catch (error) {
            throw new Error(`Failed to retrieve car: ${error}`);
        }
    }

    async updateCar(id: number, car: Partial<CarAttributes>): Promise<Car | null> {
        try {
            const existingCar = await this.findByIdCar(id);
            if (existingCar) {
                return await existingCar.update(car);
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Failed to update car: ${error}`);
        }
    }
    
    async deleteCar(id: number): Promise<void> {
        try {
            const existingCar = await this.findByIdCar(id);
            if (existingCar) {
                return existingCar.destroy();
            } else {
                throw new Error(`Car with id:${id} not found`);
            }
        } catch (error) {
            throw new Error(`Failed to delete car: ${error}`);
        }
    }
}

export default new UserRepositoy();