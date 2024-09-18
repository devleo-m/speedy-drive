import { Optional } from "sequelize";

export interface UserAttributes {
    id: number;
    name?: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'CLIENT';
}
  
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'name' | 'role'> {}