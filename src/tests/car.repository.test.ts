import { CarCreationAttributes } from "../interface/car.interface";
import CarRepository from "../repository/impl/car.repository.impl";
const SequelizeMock = require('sequelize-mock');

// Config in mock of Sequelize
const db = new SequelizeMock();
const Car = db.define("Car", {
    id: {
        type: SequelizeMock.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    model: SequelizeMock.STRING,
    brand: SequelizeMock.STRING,
    color: SequelizeMock.STRING,
    year: SequelizeMock.NUMBER,
    plate: SequelizeMock.STRING,
    dailyRate: SequelizeMock.NUMBER,
    status: SequelizeMock.ENUM('AVAILABLE', 'UNAVAILABLE')
});

// Create an instance of the repository
const carRepository = CarRepository;
(carRepository as any).Car = Car;

beforeEach(async () => {
    await Car.destroy({ where: {} }); // Destroy all records in the table
});

describe("CarRepository Tests", () => {

    let createdCarId: number;

    test("Should create a car", async () => {
        const carAttributes: CarCreationAttributes = { model: "Jest - Car", brand: "Jest - Brand", color: "While", year: 2020, plate: "XXX-9999", dailyRate: 200.55};
        const newCar = await carRepository.createCar(carAttributes);
        expect(newCar).toHaveProperty("id");
        expect(newCar.model).toBe(carAttributes.model);
        expect(newCar.brand).toBe(carAttributes.brand);
        expect(newCar.status).toBe("AVAILABLE");

        createdCarId = newCar.id;
    });
    
    test("Should list all cars", async () => {
        const cars = await carRepository.findAllCars();
        expect(Array.isArray(cars)).toBe(true);        
    });

    test("Should list all cars", async () => {
        const carsAvailable = await carRepository.findAllAvailableCars();
        expect(Array.isArray(carsAvailable)).toBe(true);
    });

    test("Should find a car", async () => {
        const user = await carRepository.findByIdCar(createdCarId);
        expect(user).not.toBeNull();
        expect(user?.model).toBe("Jest - Car");
        expect(user?.brand).toBe("Jest - Brand");
        expect(user?.status).toBe("AVAILABLE");
    });

    test("Should update a car", async () => {
        const updatedCar = await carRepository.updateCar(createdCarId, { model: "Jest - Car Updated" });
        expect(updatedCar).not.toBeNull();
        expect(updatedCar?.model).toBe("Jest - Car Updated");
    });

    test("Should delete a car", async () => {        
        await carRepository.deleteCar(createdCarId);
        const user = await carRepository.findByIdCar(createdCarId);
        expect(user).toBeNull();
    });
});