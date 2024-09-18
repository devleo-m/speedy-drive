import { UserCreationAttributes, UserAttributes } from "../../interface/user.interface";
import { IUserRepository } from "../../repository/user.repository";
import { IUserService } from "../user.service";
import User from "../../models/user.model";
import bcrypt from "bcryptjs";

class UserServiceImpl implements IUserService{

    private userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    async createUser(user: UserCreationAttributes): Promise<User> {
        
        // Check if the email is already in use
        const existingUser = await this.userRepository.findByEmailUser(user.email);
        if (existingUser) {
            throw new Error("Email already in use");
        }

        // Make sure the password is at least 6 characters long, including numbers and letters
        validatePassword(user.password);

        // Make sure the role is valid
        if (user.role !== "ADMIN" && user.role !== "CLIENT") {
            throw new Error("Role inválida");
        }

        // Using bcrypt to Encrypt password before saving
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        return await this.userRepository.createUser(user);
    }
    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.findAllUsers();
    }
    async findUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findByIdUser(id);

        // Check if the user exists
        if(!user){
            throw new Error("User not found");
        }
        return user;
    }
    async updateUser(id: number, user: Partial<UserAttributes>): Promise<User | null> {
        const existingUser = await this.findUserById(id);

        // If the email is changed, check if it is already in use
        if (user.email && user.email !== existingUser!.email) {
            const emailUser = await this.userRepository.findByEmailUser(user.email);
            if (emailUser) {
                throw new Error("Email already in use");
            }
        }

        // The user cannot change their own role
        if (user.role && user.role !== existingUser!.role) {
            throw new Error("Role change not allowed");
        }

        // Verificar se a senha foi alterada e criptografar
        if (user.password) {
            validatePassword(user.password);
            user.password = await bcrypt.hash(user.password, 10);
        }

        // Update only allowed fields
        const updatedUser = await this.userRepository.updateUser(id, user);
        if (!updatedUser) {
            throw new Error("Error updating user");
        }

        return updatedUser;
    }

    async deleteUser(id: number): Promise<void> {
        const userDelete = await this.findUserById(id);
        
        // Check if the user exists
        if (!userDelete) {
            throw new Error("User not found");
        }

        // Somente administradores podem deletar outros usuários
        if (userDelete.role === "ADMIN") {
            throw new Error("It's not allowed to delete ADMIN users");
        }

        await this.userRepository.deleteUser(id);    
    }
}

const validatePassword =(password: string): void => {
    if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        throw new Error("Password must be at least 6 characters long, including letters and numbers");
    }
}

export default UserServiceImpl;