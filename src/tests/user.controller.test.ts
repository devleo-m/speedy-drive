import supertest from "supertest";
import express from 'express';
import bodyParser from 'body-parser';
import userRouter from '../routes/user.router';

const app = express();

app.use(bodyParser.json());
app.use('/', userRouter);

describe("Teste de rotas de usuários", () => {

    let createdUserId: number; 
    let createdUserName: string;

    test("Criando novo usuario", async () => {
        const timestamp = new Date().getTime();
        const email = `fulano${timestamp}@gmail.com`;
        const createResponse = await supertest(app)
            .post("/users")
            .send({
                name: "Fulano de Tal",
                email: email,
                password: "rootroot",
            });

        expect(createResponse.status).toBe(201);
        expect(createResponse.body).toHaveProperty("name", "Fulano de Tal");
        expect(createResponse.body).toHaveProperty("email", email);

        createdUserId = createResponse.body.id;
        createdUserName = createResponse.body.name;
    });

    test("Listar todos os usuários", async () => {
        const listResponse = await supertest(app)
            .get("/users")
        
        expect(listResponse.status).toBe(200);
    })

    test("Listar usuario por id", async () => {
        const listResponse = await supertest(app)
            .get("/users/1")
        
        expect(listResponse.status).toBe(200);
    })

    test("Atualizar um usuario pelo id", async () => {
        const listResponse = await supertest(app)
            .put(`/users/${createdUserId}`)
            .send({ 
                name: `${createdUserName} - Updated/Jest`,
                email: "update-jest@gmail.com",
                password: "rootroot",
            });
        
        expect(listResponse.status).toBe(200);
    })

    test("Deletar um usuario pelo id", async () => {
        const listResponse = await supertest(app)
            .delete(`/users/${createdUserId}`);
        
        expect(listResponse.status).toBe(200);
    })
});