import { UserCreationAttributes } from "../interface/user.interface";
import UserRepository from "../repository/impl/user.repository.impl";
const SequelizeMock = require('sequelize-mock');

// Configura o mock do Sequelize
const db = new SequelizeMock();
const User = db.define("User", {
    id: {
        type: SequelizeMock.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: SequelizeMock.STRING,
    email: SequelizeMock.STRING,
    password: SequelizeMock.STRING,
    role: SequelizeMock.ENUM('ADMIN', 'CLIENT'),
});

// Cria uma instância do repositório
const userRepository = new UserRepository();
(userRepository as any).User = User;

beforeEach(async () => {
    await User.destroy({ where: {} }); // Limpa todos os registros da tabela User
});

// Testes
describe("UserRepository Tests", () => {
    
    test("should create a user", async () => {
        const uniqueEmail = `john.doe.${Date.now()}@example.com`;
        const userAttributes: UserCreationAttributes = { name: "John Doe", email: uniqueEmail, password: "password123", role: "ADMIN" };
        const newUser = await userRepository.createUser(userAttributes);
        expect(newUser).toHaveProperty("id");
        expect(newUser.name).toBe(userAttributes.name);
        expect(newUser.email).toBe(userAttributes.email);

        await userRepository.deleteUser(newUser.id);
    });
    
    test("should find all users", async () => {
        const users = await userRepository.findAllUsers();
        expect(Array.isArray(users)).toBe(true);        
    });

    test("should find a user by ID", async () => {
        const user = await userRepository.findByIdUser(1);
        expect(user).not.toBeNull();
        expect(user?.name).toBe("Admin User");
        expect(user?.email).toBe("admin@gmail.com");
    });

    test("should update a user", async () => {
        const uniqueEmail = `james.doe.${Date.now()}@example.com`;
        const userAttributes: UserCreationAttributes = { name: "James Doe", email: uniqueEmail, password: "password123" };
        const createdUser = await userRepository.createUser(userAttributes);
        const updatedUser = await userRepository.updateUser(createdUser.id, { name: "James Updated" });
        expect(updatedUser).not.toBeNull();
        expect(updatedUser?.name).toBe("James Updated");

        await userRepository.deleteUser(createdUser.id);
    });

    test("should delete a user", async () => {
        const uniqueEmail = `jack.doe.${Date.now()}@example.com`;
        const userAttributes: UserCreationAttributes = { name: "Jack Doe", email: uniqueEmail, password: "password123" };
        const createdUser = await userRepository.createUser(userAttributes);
        
        await userRepository.deleteUser(createdUser.id);
        const user = await userRepository.findByIdUser(createdUser.id);
        expect(user).toBeNull();
    });
});

//https://sequelize-mock.readthedocs.io/en/stable/docs/getting-started/