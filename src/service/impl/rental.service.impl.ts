import { RentalCreationAttributes, RentalAttributes } from "../../interface/rental.interface";
import { IRentalService } from "../rental.service";
import Rental from "../../models/rental.model";
import carRepositoryImpl from "../../repository/impl/car.repository.impl";
import rentalRepository from "../../repository/impl/rental.repository.impl";

class RentalServiceImpl implements IRentalService{

   async createRental(rental: RentalCreationAttributes): Promise<Rental> {
        const car = await carRepositoryImpl.findByIdCar(rental.carId);

        if (!car) { // Check if car exists
            throw new Error('Car not found');
        }

        if (car.status !== "AVAILABLE") { // Check if car is available
            throw new Error('Car unavailable for rental');
        }

        const rentalDays = Math.ceil((rental.endDate.getTime() - rental.startDate.getTime()) / (1000 * 60 * 60 * 24));
        const price = car.dailyRate * rentalDays; // Calculate rental price
        const totalRental = {...rental, price} // Create total rental object

        return await rentalRepository.createRental(totalRental);
    }
    async findAllRentals(): Promise<Rental[]> {
        return await rentalRepository.findAllRentals()
    }
    async findByIdRental(id: number): Promise<Rental | null> {
        return await rentalRepository.findByIdRental(id)
    }

    async updateRental(id: number, updateData: Partial<RentalAttributes>): Promise<Rental | null> {
        
        const existingRental = await rentalRepository.findByIdRental(id);
        if (!existingRental) { // Find existing rental
            throw new Error('Rental not found');
        }

        if (updateData.startDate && updateData.endDate) {
            const rentalDays = Math.ceil((updateData.endDate.getTime() - updateData.startDate.getTime()) / (1000 * 60 * 60 * 24));
            const car = await carRepositoryImpl.findByIdCar(existingRental.carId);
            if (!car) { // If update data has start date and end date, recalculate price
                throw new Error('Car not found');
            }
            updateData.price = car.dailyRate * rentalDays;  // recalculate price
        }
        return await rentalRepository.updateRental(id, updateData);
    }    
    
    async deleteRental(id: number): Promise<void> {
        await rentalRepository.deleteRental(id)
    }
}

export default new RentalServiceImpl();