import { UserAttributes, UserCreationAttributes } from "../interface/user.interface";
import User from "../models/user.model";

export interface IUserService {
    createUser(user: UserCreationAttributes): Promise<User>;
    findAllUsers(): Promise<User[]>;
    findUserById(id: number): Promise<User | null>;
    updateUser(id: number, user: Partial<UserAttributes>): Promise<User | null>;
    deleteUser(id: number): Promise<void>;
}