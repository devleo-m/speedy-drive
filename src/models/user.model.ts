import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { UserAttributes, UserCreationAttributes } from "../interface/user.interface";

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: number;
    name?: string | undefined;
    email!: string;
    password!: string;
    role!: "ADMIN" | "CLIENT";
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('ADMIN', 'CLIENT'),
        allowNull: false,
        defaultValue: 'CLIENT'
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false
});