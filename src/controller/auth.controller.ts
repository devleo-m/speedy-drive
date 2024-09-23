import { Request, Response } from 'express';
import { authSchema } from '../schemas/auth.schema';
import { AuthService } from '../service/auth.service';
import { ZodError } from 'zod';

export namespace AuthController {
    export const login = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = authSchema.parse(req.body);
            const token = await AuthService.loginUser(user.email, user.password);
            res.status(200).json(token);
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ message: `Validation failed: ${error.message}`});
            }
            res.status(401).json({ message: 'Invalid email or password' });
        }
    };

    export const register = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = authSchema.parse(req.body); // Valida o esquema do usuário
            const token = await AuthService.registerUser(user.email, user.password); // Registra o usuário e gera o token
            res.status(201).json(token); // Retorna o token
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ message: `Validation failed: ${error.message}` });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    };
}

