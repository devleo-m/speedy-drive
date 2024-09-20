import Car from "../../models/car.model";
import CarRepository from "../../repository/impl/car.repository.impl";
import { ICarService } from "../car.service";
import { ICarRepository } from "../../repository/car.repository";
import { CarCreationAttributes, CarAttributes } from "../../interface/car.interface";

class CarServiceImpl implements ICarService {

    private carRepository: ICarRepository = CarRepository;
    
    async createCar(car: CarCreationAttributes): Promise<Car> {
        return await this.carRepository.createCar(car);
    }
    async findAllCars(): Promise<Car[]> {
        return await this.carRepository.findAllCars();
    }
    async findByIdCar(id: number): Promise<Car | null> {
        return await this.carRepository.findByIdCar(id);
    }
    async updateCar(id: number, car: Partial<CarAttributes>): Promise<Car | null> {
        return await this.carRepository.updateCar(id, car);
    }
    async deleteCar(id: number): Promise<void> {
        return await this.carRepository.deleteCar(id);
    }
}

export default new CarServiceImpl();