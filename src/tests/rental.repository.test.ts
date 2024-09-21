import { RentalCreationAttributes } from "../interface/rental.interface";
import RentalRepository from "../repository/impl/rental.repository.impl";
const SequelizeMock = require('sequelize-mock');

// Config in mock of Sequelize
const db = new SequelizeMock();
const Rental = db.define("Rental", {
    id: {
        type: SequelizeMock.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    startDate: SequelizeMock.DATE,
    endDate: SequelizeMock.DATE,
    price: SequelizeMock.NUMBER,
    userId: SequelizeMock.NUMBER,
    carId: SequelizeMock.NUMBER,
});

// Create an instance of the repository
const rentalRepository = RentalRepository;
(rentalRepository as any).Rental = Rental;

describe("RentalRepository Tests", () => {

    let createdRentalId: number;

    test("Should create a rental", async () => {
        const rentalAttributes: RentalCreationAttributes = { startDate: new Date(2024, 2, 1), endDate: new Date(2024, 2, 10), price: 2300.43, userId: 1, carId: 1 };
        const newRental = await rentalRepository.createRental(rentalAttributes);
        expect(newRental).toHaveProperty("id");

        createdRentalId = newRental.id;
    });
    
    test("Should list all rentals", async () => {
        const rentals = await rentalRepository.findAllRentals();
        expect(Array.isArray(rentals)).toBe(true);       
    });

    test("Should find a rental", async () => {
        const rental = await rentalRepository.findByIdRental(createdRentalId);
        expect(rental).not.toBeNull();

    });

    test("Should update a rental", async () => {
        const updatedCar = await rentalRepository.updateRental(createdRentalId, { price: 3000.43 });
        expect(updatedCar).not.toBeNull();
        expect(updatedCar?.price).toBe(3000.43);
    });

    test("Should delete a rental", async () => {        
        await rentalRepository.deleteRental(createdRentalId);
        const user = await rentalRepository.findByIdRental(createdRentalId);
        expect(user).toBeNull();
    });
});