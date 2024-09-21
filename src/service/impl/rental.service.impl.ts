import { RentalCreationAttributes, RentalAttributes } from "../../interface/rental.interface";
import { IRentalService } from "../rental.service";
import Rental from "../../models/rental.model";
import carRepositoryImpl from "../../repository/impl/car.repository.impl";
import rentalRepository from "../../repository/impl/rental.repository.impl";
import { CarRules } from "../../utils/rules/car.rules";

class RentalServiceImpl implements IRentalService{

   async createRental(rental: RentalCreationAttributes): Promise<Rental> {
        const car = await carRepositoryImpl.findByIdCar(rental.carId);

        if (!car) {
            throw new Error('Car not found');
        }

        if (!CarRules.isAvailable(car)) {
            throw new Error('Car unavailable for rental');
        }

        const hasOverlapping = await CarRules.hasOverlappingRentals(rental.carId, rental.startDate, rental.endDate);
        if (hasOverlapping) {
            throw new Error('Car has overlapping rental - invalid dates');
        }

        const rentalDays = Math.ceil((rental.endDate.getTime() - rental.startDate.getTime()) / (1000 * 60 * 60 * 24));
        const price = CarRules.calculateRentalPrice(car, rentalDays);

        // Create rental in database
        return await rentalRepository.createRental({...rental,price});
    }
    async findAllRentals(): Promise<Rental[]> {
        return await rentalRepository.findAllRentals()
    }
    async findByIdRental(id: number): Promise<Rental | null> {
        return await rentalRepository.findByIdRental(id)
    }
    async updateRental(id: number, car: Partial<RentalAttributes>): Promise<Rental | null> {
        return await rentalRepository.updateRental(id, car)
    }
    async deleteRental(id: number): Promise<void> {
        await rentalRepository.deleteRental(id)
    }
}

export default new RentalServiceImpl();