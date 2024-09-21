import { RentalCreationAttributes, RentalAttributes } from "../../interface/rental.interface";
import Rental from "../../models/rental.model";
import { IRentalRepository } from "../rental.repository";

class RentalRepository implements IRentalRepository{
    async createRental(rental: RentalCreationAttributes): Promise<Rental> {
        try {
            return await Rental.create(rental);
        } catch (error) {
            throw new Error(`Failed to create rental: ${error}`);
        }
    }
    async findAllRentals(): Promise<Rental[]> {
        try {
            return await Rental.findAll();
        } catch (error) {
            throw new Error(`Failed to retrieve rentals: ${error}`);
        }
    }
    async findByIdRental(id: number): Promise<Rental | null> {
        try {
            return await Rental.findByPk(id);
        } catch (error) {
            throw new Error(`Failed to retrieve rental: ${error}`);
        }
    }
    async updateRental(id: number, rental: Partial<RentalAttributes>): Promise<Rental | null> {
        try {
            const existingRental = await this.findByIdRental(id);
            if (!existingRental) {
                throw new Error(`Rental with id:${id} not found`);
            }
            return await existingRental.update(rental);
        } catch (error) {
            throw new Error(`Failed to update rental: ${error}`);
        }
    }
    async deleteRental(id: number): Promise<void> {
        try {
            const existingRental = await this.findByIdRental(id);
            if (!existingRental) {
                throw new Error(`Rental with id:${id} not found`);
            }
            await existingRental.destroy();
        } catch (error) {
            throw new Error(`Failed to delete rental: ${error}`);
        }
    }
}

export default new RentalRepository();