import { UserCreationAttributes, UserAttributes } from "../../interface/user.interface";
import { IUserService } from "../user.service";
import User from "../../models/user.model";
import bcrypt from "bcryptjs";
import userRepository from "../../repository/impl/user.repository.impl";

class UserServiceImpl implements IUserService{

    async createUser(user: UserCreationAttributes): Promise<User> {
        // Check if the email is already in use
        const existingUser = await userRepository.findByEmailUser(user.email);
        if (existingUser) {
            throw new Error("Email already in use");
        }

        // Make sure the role is valid
        if (user.role !== "ADMIN" && user.role !== "CLIENT") {
            throw new Error("Role inválida");
        }

        user.role = "CLIENT";

        // Using bcrypt to Encrypt password before saving
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        return await userRepository.createUser(user);
    }

    async findAllUsers(): Promise<User[]> {
        return await userRepository.findAllUsers();
    }

    async findUserById(id: number): Promise<User | null> {
        return await userRepository.findByIdUser(id);
    }

    async updateUser(id: number, user: Partial<UserAttributes>): Promise<User | null> {
        const existingUser = await this.findUserById(id);

        // If the email is changed, check if it is already in use
        if (user.email && user.email !== existingUser!.email) {
            const emailUser = await userRepository.findByEmailUser(user.email);
            if (emailUser) {
                throw new Error("Email already in use");
            }
        }

        // The user cannot change their own role
        if (user.role && user.role !== existingUser!.role) {
            throw new Error("Role change not allowed");
        }

        // If the password is changed, hash it
        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }

        return await userRepository.updateUser(id, user);
    }

    async deleteUser(id: number): Promise<void> {
        const userDelete = await userRepository.findByIdUser(id);
        
        // Check if the user exists
        if (!userDelete) {
            throw new Error("User not found");
        }

        // Somente administradores podem deletar outros usuários
        if (userDelete.role === "ADMIN") {
            throw new Error("It's not allowed to delete ADMIN users");
        }

        await userRepository.deleteUser(id);    
    }
}

export default new UserServiceImpl();