import { PaymentCreationAttributes, PaymentAttributes } from "../../interface/payment.interface";
import Payment from "../../models/payment.model";
import { IPaymentRepository } from "../payment.repository";

class PaymentRepository implements IPaymentRepository{
    async createPayment(payment: PaymentCreationAttributes): Promise<Payment> {
        try {
            return await Payment.create(payment);
        } catch (error) {
            throw new Error(`Failed to create payment ${error}`);
        }
    }
    async findAllPayments(): Promise<Payment[]> {
        try {
            return await Payment.findAll();
        } catch (error) {
            throw new Error(`Failed to retrieve payments ${error}`);
        }
    }
    async findByIdPayment(id: number): Promise<Payment | null> {
        try {
            return await Payment.findByPk(id);
        } catch (error) {
            throw new Error(`Failed to retrieve payment ${error}`);
        }
    }
    async updatePayment(id: number, payment: Partial<PaymentAttributes>): Promise<Payment | null> {
        try {
            const existingPayment = await this.findByIdPayment(id);
            if (!existingPayment) {
                throw new Error(`Payment with id:${id} not found`);
            }
            return await existingPayment.update(payment);
        } catch (error) {
            throw new Error(`Failed to update payment: ${error}`);
        }
    }
    async deletePayment(id: number): Promise<void> {
        try {
            const existingPayment = await this.findByIdPayment(id);
            if (!existingPayment) {
                throw new Error(`Payment with id:${id} not found`);
            }
            await existingPayment.destroy();
        } catch (error) {
            throw new Error(`Failed to delete payment: ${error}`);
        }
    }
}

export default new PaymentRepository();