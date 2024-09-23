import { PaymentCreationAttributes, PaymentAttributes } from "../../interface/payment.interface";
import Payment from "../../models/payment.model";
import paymentRepository from "../../repository/impl/payment.repository.impl";
import { IPaymentService } from "../payment.service";

class PaymentServiceImpl implements IPaymentService{
    async createPayment(payment: PaymentCreationAttributes): Promise<Payment> {
        return await paymentRepository.createPayment(payment);
    }
    async findAllPayments(): Promise<Payment[]> {
        return await paymentRepository.findAllPayments();
    }
    async findByIdPayment(id: number): Promise<Payment | null> {
        return await paymentRepository.findByIdPayment(id);
    }
    async updatePayment(id: number, payment: Partial<PaymentAttributes>): Promise<Payment | null> {
        return await paymentRepository.updatePayment(id, payment);
    }
    async deletePayment(id: number): Promise<void> {
        return await paymentRepository.deletePayment(id);
    }
}

export default new PaymentServiceImpl();