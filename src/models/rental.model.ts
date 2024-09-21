import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { RentalAttributes, RentalCreationAttributes } from "../interface/rental.interface";
import User from "./user.model";
import Car from "./car.model";

class Rental extends Model<RentalAttributes, RentalCreationAttributes> implements RentalAttributes{
    id!: number;
    startDate!: Date;
    endDate!: Date;
    price!: number;
    userId!: number;
    carId!: number;
}

Rental.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    price:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Rental',
    tableName: 'Rentals',
    timestamps: false
});

User.hasMany(Rental, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "rentals"
});

Rental.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    as: "user"
});

Car.hasMany(Rental, {
    foreignKey: "carId",
    sourceKey: "id",
    as: "rentals"
});

Rental.belongsTo(Car, {
    foreignKey: "carId",
    targetKey: "id",
    as: "car"
});

export default Rental;