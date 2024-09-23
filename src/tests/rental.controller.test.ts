import supertest from "supertest";
import express from 'express';
import bodyParser from 'body-parser';
import rentalRouter from '../routes/rental.router';

const app = express();

app.use(bodyParser.json());
app.use('/', rentalRouter);

const token = "[free:token]";

describe("Test and routes for rentals", () => {

    let createdRentalId: number; 

    test("Create a Rental", async () => {
        const createResponse = await supertest(app)
            .post("/rentals")
            .set('Authorization', `Bearer ${token}`)
            .send({
                startDate: new Date(2025, 2, 1),
                endDate: new Date(2025, 2, 10),
                price: 2300.43,
                userId: 1,
                carId: 1
            });

        expect(createResponse.status).toBe(201);
        createdRentalId = createResponse.body.id;
    });

    test("List all Rentals", async () => {
        const listResponse = await supertest(app)
            .get("/rentals")
            .set('Authorization', `Bearer ${token}`)
        
        expect(listResponse.status).toBe(200);
    });

    test("List a Rental", async () => {
        const listResponse = await supertest(app)
            .get(`/rentals/${createdRentalId}`)
            .set('Authorization', `Bearer ${token}`)

        expect(listResponse.status).toBe(200);
        expect(listResponse.body).toHaveProperty('id', createdRentalId);
    });

    test("Update a Rental", async () => {
        const updateResponse = await supertest(app)
            .put(`/rentals/${createdRentalId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ 
                carId: 2
            });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.carId).toBe(2);
    });

    test("Delete a Rental", async () => {
        const deleteResponse = await supertest(app)
            .delete(`/rentals/${createdRentalId}`)
            .set('Authorization', `Bearer ${token}`)
        
        expect(deleteResponse.status).toBe(200);
    });
});