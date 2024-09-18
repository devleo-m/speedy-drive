import { UserCreationAttributes, UserAttributes } from "../../interface/user.interface";
import { IUserRepository } from "../../repository/user.repository";
import { IUserService } from "../user.service";
import User from "../../models/user.model";
import bcrypt from "bcryptjs";
import UserRepository from "../../repository/impl/user.repository.impl";

class UserServiceImpl implements IUserService{

    private userRepository = UserRepository;

    /**
     * Creates a new user.
     * @param {UserCreationAttributes} user - The user attributes to be created.
     * @returns {Promise<User>} Returns the created user.
     * @throws {Error} If the email is already in use or if the role or password is invalid.
    */
    async createUser(user: UserCreationAttributes): Promise<User> {
        // Check if the email is already in use
        const existingUser = await this.userRepository.findByEmailUser(user.email);
        if (existingUser) {
            throw new Error("Email already in use");
        }

        // Make sure the role is valid
        if (user.role !== "ADMIN" && user.role !== "CLIENT") {
            throw new Error("Role inválida");
        }

        // Using bcrypt to Encrypt password before saving
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        return await this.userRepository.createUser(user);
    }

    /**
     * Retrieves all users.
     * @returns {Promise<User[]>} Returns a list of users.
    */
    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.findAllUsers();
    }

    /**
     * Finds a user by their ID.
     * @param {number} id - The ID of the user to be retrieved.
     * @returns {Promise<User | null>} Returns the found user or null if the user does not exist.
     * @throws {Error} If the user is not found.
    */
    async findUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findByIdUser(id);

        // Check if the user exists
        if(!user){
            throw new Error("User not found");
        }
        return user;
    }

    /**
     * Updates an existing user.
     * @param {number} id - The ID of the user to be updated.
     * @param {Partial<UserAttributes>} user - The user attributes to be updated.
     * @returns {Promise<User | null>} Returns the updated user or null if the update fails.
     * @throws {Error} If the email is already in use, the role is changed, or the password is invalid.
    */
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
            user.password = await bcrypt.hash(user.password, 10);
        }

        // Update only allowed fields
        const updatedUser = await this.userRepository.updateUser(id, user);
        if (!updatedUser) {
            throw new Error("Error updating user");
        }
        return updatedUser;
    }

    /**
     * Deletes a user by their ID.
     * @param {number} id - The ID of the user to be deleted.
     * @returns {Promise<void>} Returns void if the deletion is successful.
     * @throws {Error} If the user is not found or if the user is an ADMIN.
    */
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

export default new UserServiceImpl();