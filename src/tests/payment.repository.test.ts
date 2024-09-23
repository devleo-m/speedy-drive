import { PaymentCreationAttributes } from "../interface/payment.interface";
import PaymentRepository from "../repository/impl/payment.repository.impl";
const SequelizeMock = require('sequelize-mock');

// Config in mock of Sequelize
const db = new SequelizeMock();
const Payment = db.define("Payment", {
    id: {
        type: SequelizeMock.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    method: SequelizeMock.ENUM('DEBIT','CREDIT', 'PIX', 'MONEY'),
    status: SequelizeMock.ENUM('PAID', 'UNPAID'),
    paymentDate: SequelizeMock.DATE,
    rentalId: SequelizeMock.NUMBER
});

// Create an instance of the repository
const paymentRepository = PaymentRepository;
(paymentRepository as any).Payment = Payment;

describe("PaymentRepository Tests", () => {

    let createdPaymentId: number;

    test("Should create a Payment", async () => {
        const paymentAttributes: PaymentCreationAttributes = { method: "CREDIT", status: "PAID", rentalId: 1 };
        const newPayment = await paymentRepository.createPayment(paymentAttributes);
        expect(newPayment).toHaveProperty("id");

        createdPaymentId = newPayment.id;
    });
    
    test("Should list all Payments", async () => {
        const payments = await paymentRepository.findAllPayments();
        expect(Array.isArray(payments)).toBe(true);       
    });

    test("Should find a Payment", async () => {
        const payment = await paymentRepository.findByIdPayment(createdPaymentId);
        expect(payment).not.toBeNull();
    });

    test("Should update a Payment", async () => {
        const updatedPayment = await paymentRepository.updatePayment(createdPaymentId, { status: "PAID" });
        expect(updatedPayment).not.toBeNull();
        expect(updatedPayment?.status).toBe("PAID");
    });

    test("Should delete a Payment", async () => {        
        await paymentRepository.deletePayment(createdPaymentId);
        const payment = await paymentRepository.findByIdPayment(createdPaymentId);
        expect(payment).toBeNull();
    });
});