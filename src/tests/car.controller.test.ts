import supertest from "supertest";
import express from 'express';
import bodyParser from 'body-parser';
import carRouter from '../routes/car.router';

const app = express();

app.use(bodyParser.json());
app.use('/', carRouter);

describe("Test and routes for cars", () => {

    let createdCarId: number; 
    let createdCarModel: string;

    test("Create a car", async () => {
        const timestamp = new Date().getTime();
        const model = `Prisma${timestamp}`;
        const createResponse = await supertest(app)
            .post("/cars")
            .send({
                model: model,
                brand: "Jest - Brand",
                color: "White",
                year: 2020,
                plate: "XXX-9999",
                dailyRate: 200.55
            });

        expect(createResponse.status).toBe(201);
        expect(createResponse.body).toHaveProperty("status", "AVAILABLE");

        createdCarId = createResponse.body.id;
        createdCarModel = createResponse.body.model;
    });

    test("List all cars", async () => {
        const listResponse = await supertest(app)
            .get("/cars")
        
        expect(listResponse.status).toBe(200);
    })

    test("List a car", async () => {
        const listResponse = await supertest(app)
            .get(`/cars/${createdCarId}`)
        
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.model).toBe(createdCarModel);
    })

    test("Atualizar um usuario pelo id", async () => {
        const updateResponse = await supertest(app)
            .put(`/cars/${createdCarId}`)
            .send({ 
                status: "UNAVAILABLE"
            });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.model).toBe(createdCarModel);
        expect(updateResponse.body.status).toBe("UNAVAILABLE");
    })

    test("Deletar um usuario pelo id", async () => {
        const deleteResponse = await supertest(app)
            .delete(`/cars/${createdCarId}`);
        
        expect(deleteResponse.status).toBe(200);

    })
});