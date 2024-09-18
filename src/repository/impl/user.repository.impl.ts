import { IUserRepository } from "../user.repository";
import User from "../../models/user.model";
import { UserCreationAttributes, UserAttributes } from "../../interface/user.interface";

/**
 * Repository implementation for managing user data.
 */
class UserRepository implements IUserRepository {

    /**
    * Creates a new user.
    * @param user - The attributes of the user to be created.
    * @returns The promise with the created user.
    * @throws Error if user creation fails.
    */
    async createUser(user: UserCreationAttributes): Promise<User> {
        try {
            const newUser = await User.create(user);
            console.log(newUser.toJSON()); // logger.info(`User created: ${JSON.stringify(newUser)}`);
            return newUser;
        } catch (error) {
            console.error(`Error creating user: ${error}`); // logger.error(`Error creating user: ${error.message || error}`);
            throw new Error('Failed to create user');
        }
    }

    /**
    * Finds all users.
    * @returns A promise with an array of all users.
    * @throws Error if the retrieval fails.
    */
    async findAllUsers(): Promise<User[]> {
        try {
            const users = await User.findAll();
            console.log(users);
            return users;
        } catch (error) {
            console.error(`Error finding all users: ${error}`);
            throw new Error('Failed to retrieve users');
        }
    }

    /**
    * Finds a user by ID.
    * @param id - The ID of the user to be found.
    * @returns A promise with the user found, or null if not found.
    * @throws Error if the retrieval fails.
    */
    async findByIdUser(id: number): Promise<User | null> {
        try {
            const user = await User.findByPk(id);
            console.log(user?.toJSON());
            return user;
        } catch (error) {
            console.error(`Error finding user by ID: ${error}`);
            throw new Error('Failed to retrieve user');
        }    
    }

    async findByEmailUser(email: string): Promise<User | null> {
        try {
            const user = await User.findOne({ where: { email } });
            console.log(user?.toJSON());
            return user;
        } catch (error) {
            console.error(`Error finding user by email: ${error}`);
            throw new Error('Failed to retrieve user');
        }
    }

    /**
    * Updates an existing user.
    * @param id - The ID of the user to be updated.
    * @param user - The attributes to be updated.
    * @returns A promise with the updated user, or null if the user was not found.
    * @throws Error if the update fails.
    */
    async updateUser(id: number, user: Partial<UserAttributes>): Promise<User | null> {
        try {
            const existingUser = await this.findByIdUser(id);
            if (existingUser) {
                console.log(`User found: ${JSON.stringify(existingUser)}`);
                console.log(`User to be updated: ${JSON.stringify(user)}`);
                return await existingUser.update(user);
            } else {
                return null;
            }
        } catch (error) {
            console.error(`Error updating user: ${error}`);
            throw new Error('Failed to update user');
        }
    }

    /**
    * Deletes a user by ID.
    * @param id - The ID of the user to be deleted.
    * @returns A promise indicating the completion of the delete operation.
    * @throws Error if the user to delete is not found or the operation fails.
    */
    async deleteUser(id: number): Promise<void> {
        try {
            const user = await this.findByIdUser(id);
            if (user) {
                await user.destroy();
                console.log(`User deleted: ${JSON.stringify(user)}`);            
            } else {
                throw new Error(`User with id ${id} not found`);
            }
        } catch (error) {
            console.error(`Error deleting user: ${error}`);
            throw new Error('Failed to delete user');
        }
    }
}

export default new UserRepository();