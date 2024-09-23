import supertest from "supertest";
import express from 'express';
import bodyParser from 'body-parser';
import paymentRouter from '../routes/payment.router';

const app = express();

app.use(bodyParser.json());
app.use('/', paymentRouter);

const token = "[free:token]";

describe("Test and routes for payments", () => {

    let createdPaymentId: number; 

    test("Create a Payment", async () => {
        const createResponse = await supertest(app)
            .post("/payments")
            .set('Authorization', `Bearer ${token}`)
            .send({
                method: "CREDIT",
                rentalId: 2
            });

        expect(createResponse.status).toBe(201);

        createdPaymentId = createResponse.body.id;
    });

    test("List all Payment", async () => {
        const listResponse = await supertest(app)
            .get("/payments")
            .set('Authorization', `Bearer ${token}`)
        
        expect(listResponse.status).toBe(200);
    })

    test("List a Payment", async () => {
        const listResponse = await supertest(app)
            .get(`/payments/${createdPaymentId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.status).toBe("UNPAID");
    })

    test("Update a Payment", async () => {
        const updateResponse = await supertest(app)
            .put(`/payments/${createdPaymentId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ 
                status: "PAID"
            });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.status).toBe("PAID");
    })

    test("Delete a Payment", async () => {
        const deleteResponse = await supertest(app)
            .delete(`/payments/${createdPaymentId}`)
            .set('Authorization', `Bearer ${token}`)
        
        expect(deleteResponse.status).toBe(200);
    })
});