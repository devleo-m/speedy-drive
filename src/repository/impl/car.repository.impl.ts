import Car from "../../models/car.model";
import { CarCreationAttributes, CarAttributes } from "../../interface/car.interface";
import { ICarRepository } from "../car.repository";

class CarRepositoy implements ICarRepository {
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

    async findAllAvailableCars(): Promise<Car[]> {
        try {
            return await Car.findAll({
                where: { status: 'AVAILABLE' },
            });
        } catch (error) {
            throw new Error(`Failed to retrieve available cars: ${error}`);
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
            if (!existingCar) {
                throw new Error(`Car with id:${id} not found`)
            }
            return await existingCar.update(car);
        } catch (error) {
            throw new Error(`Failed to update car: ${error}`);
        }
    }

    async deleteCar(id: number): Promise<void> {
        try {
            const existingCar = await this.findByIdCar(id);
            if (!existingCar) {
                throw new Error(`Car with id:${id} not found`);
            }
            await existingCar.destroy();
        } catch (error) {
            throw new Error(`Failed to delete car: ${error}`);
        }
    }
}

export default new CarRepositoy();