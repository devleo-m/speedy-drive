import supertest from "supertest";
import express from 'express';
import bodyParser from 'body-parser';
import clientRouter from '../routes/client.router';

const app = express();

app.use(bodyParser.json());
app.use('/client', clientRouter);

const token = "[free:token]";

describe("Test and routes for cars", () => {

    test("List all cars avaliable", async () => {
        const listResponse = await supertest(app)
            .get("/client/available")
            .set('Authorization', `Bearer ${token}`)
        
        expect(listResponse.status).toBe(200);
    })
});