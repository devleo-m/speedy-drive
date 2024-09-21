import Car from "../../models/car.model";
import carRepository from "../../repository/impl/car.repository.impl";
import { ICarService } from "../car.service";
import { CarCreationAttributes, CarAttributes } from "../../interface/car.interface";

class CarServiceImpl implements ICarService {
    
    async createCar(car: CarCreationAttributes): Promise<Car> {
        return await carRepository.createCar(car);
    }
    async findAllCars(): Promise<Car[]> {
        return await carRepository.findAllCars();
    }
    async findByIdCar(id: number): Promise<Car | null> {
        return await carRepository.findByIdCar(id);
    }
    async updateCar(id: number, car: Partial<CarAttributes>): Promise<Car | null> {
        return await carRepository.updateCar(id, car);
    }
    async deleteCar(id: number): Promise<void> {
        return await carRepository.deleteCar(id);
    }
}

export default new CarServiceImpl();