import { Optional } from "sequelize"

export interface PaymentAttributes {
    id: number
    method: "DEBIT" | "CREDIT" | "PIX" | "MONEY"
    status: "PAID" | "UNPAID"
    paymentDate: Date
    rentalId: number
}

export interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id' | 'paymentDate'>{}