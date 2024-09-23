import Payment from "../models/payment.model";
import { PaymentAttributes, PaymentCreationAttributes } from "../interface/payment.interface";

export interface IPaymentService {
    createPayment(payment: PaymentCreationAttributes): Promise<Payment>;
    findAllPayments(): Promise<Payment[]>;
    findByIdPayment(id: number): Promise<Payment | null>;
    updatePayment(id: number, payment: Partial<PaymentAttributes>): Promise<Payment | null>;
    deletePayment(id: number): Promise<void>;
}