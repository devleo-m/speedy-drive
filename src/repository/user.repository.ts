import User from "../models/user.model";
import { UserAttributes, UserCreationAttributes } from "../interface/user.interface";

export interface IUserRepository {
    createUser(user: UserCreationAttributes): Promise<User>;
    findAllUsers(): Promise<User[]>;
    findByIdUser(id: number): Promise<User | null>;
    findByEmailUser(email: string): Promise<User | null>;
    updateUser(id: number, user: Partial<UserAttributes>): Promise<User | null>;
    deleteUser(id: number): Promise<void>;
}