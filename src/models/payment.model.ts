import { DataTypes, Model, Sequelize } from "sequelize";
import { PaymentAttributes, PaymentCreationAttributes } from "../interface/payment.interface";
import { sequelize } from "../config/database";
import Rental from "./rental.model";

class Payment extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
    id!: number;
    method!: "DEBIT" | "CREDIT" | "PIX" | "MONEY";
    status!: "PAID" | "UNPAID";
    paymentDate!: Date;
    rentalId!: number;
}

Payment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    method: {
        type: DataTypes.ENUM('DEBIT','CREDIT', 'PIX', 'MONEY'),
        allowNull: false,
        defaultValue: 'MONEY'
    },
    status: {
        type: DataTypes.ENUM('PAID', 'UNPAID'),
        allowNull: false,
        defaultValue: 'UNPAID'
    },
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    rentalId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Payment',
    tableName: 'Payments',
    timestamps: false
});

Rental.hasOne(Payment, {
    foreignKey: 'rentalId',
    sourceKey: 'id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
})

Payment.belongsTo(Rental, {
    foreignKey: 'rentalId',
    targetKey: 'id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
})

export default Payment;