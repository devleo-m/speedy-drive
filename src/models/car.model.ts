import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { CarAttributes, CarCreationAttributes } from "../interface/car.interface";

class Car extends Model<CarAttributes, CarCreationAttributes> implements CarAttributes {
    id!: number;
    model!: string;
    brand!: string;
    color!: string;
    year!: number;
    plate!: string;
    dailyRate!: number;
    status!: "AVAILABLE" | "UNAVAILABLE";
}

Car.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    plate: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dailyRate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('AVAILABLE', 'UNAVAILABLE'),
        allowNull: false,
        defaultValue: 'AVAILABLE'
    }
}, {
    sequelize,
    modelName: 'Car',
    tableName: 'Cars',
    timestamps: false
});

export default Car