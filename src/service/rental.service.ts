import Rental from "../models/rental.model";
import { RentalAttributes, RentalCreationAttributes } from "../interface/rental.interface";

export interface IRentalService {
    createRental(rental: RentalCreationAttributes): Promise<Rental>;
    findAllRentals(): Promise<Rental[]>;
    findByIdRental(id: number): Promise<Rental | null>;
    updateRental(id: number, rental: Partial<RentalAttributes>): Promise<Rental | null>;
    deleteRental(id: number): Promise<void>;
}