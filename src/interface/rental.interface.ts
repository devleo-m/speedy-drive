import { Optional } from "sequelize";

export interface RentalAttributes {
    id: number;
    startDate: Date;
    endDate: Date;
    price: number;
    userId: number;
    carId: number;
}

export interface RentalCreationAttributes extends Optional<RentalAttributes, 'id' | "price"> {}