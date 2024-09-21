import { IUserRepository } from "../user.repository";
import User from "../../models/user.model";
import { UserCreationAttributes, UserAttributes } from "../../interface/user.interface";

class UserRepository implements IUserRepository {

    async createUser(user: UserCreationAttributes): Promise<User> {
        try {
            return await User.create(user);
        } catch (error) {
            throw new Error(`Failed to create user ${error}`);
        }
    }

    async findAllUsers(): Promise<User[]> {
        try {
            return await User.findAll();
        } catch (error) {
            throw new Error(`Failed to retrieve users ${error}`);
        }
    }

    async findByIdUser(id: number): Promise<User | null> {
        try {
            return await User.findByPk(id);
        } catch (error) {
            throw new Error(`Failed to retrieve user ${error}`);
        }    
    }

    async findByEmailUser(email: string): Promise<User | null> {
        try {
            return await User.findOne({ where: { email } });
        } catch (error) {
            throw new Error(`Failed to retrieve user ${error}`);
        }
    }

    async updateUser(id: number, user: Partial<UserAttributes>): Promise<User | null> {
        try {
            const existingUser = await this.findByIdUser(id);
            if (!existingUser) {
                throw new Error(`User with id:${id} not found`)
            }
            return await existingUser.update(user);
        } catch (error) {
            throw new Error(`Failed to update user ${error}`);
        }
    }

    async deleteUser(id: number): Promise<void> {
        try {
            const existingUser = await this.findByIdUser(id);
            if (!existingUser) {
                throw new Error(`User with id ${id} not found`);
            }
            await existingUser.destroy();
        } catch (error) {
            throw new Error(`Failed to delete user ${error}`);
        }
    }
}

export default new UserRepository();