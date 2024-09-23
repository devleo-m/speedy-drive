import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'izi-jwt-secret';

export namespace AuthService {
    export const loginUser = async (email: string, password: string): Promise<string> => { // Function for logging in a user
        
        const user = await User.findOne({ where: { email } }); // Find the user by email

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) { // Check if the password is valid
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '10h' }); // Create a JWT token
        return token;
    };

    export const registerUser = async (email: string, password: string): Promise<string> => {
        const existingUser = await User.findOne({ where: { email } });
    
        if (existingUser) {
            throw new Error(`User with email ${email} already exists`);
        }
    
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = await User.create({ email, password: hashedPassword, role: 'CLIENT' }); // Create a new user
    
        const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: '10h' }); // Create a JWT token
        return token;
    }
}

export default AuthService;