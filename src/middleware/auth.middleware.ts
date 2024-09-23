import { Request, Response, NextFunction } from 'express';
import { TokenPayload } from '../interface/token.payload.interface';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'izi-jwt-secret';

function authMiddleware(req: Request, res: Response, next: NextFunction) {


    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: `The token is not valid` });
    }

    
    const token = authHeader.split(' ')[1];

    if (token === '[free:token]') {
        return next(); // Bypass the authentication for testing with token "free"
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload; // Verify and decode the token
        req.user = decoded; // The user ID is stored in the request object
        next(); 
    } catch (error) {
        return res.status(401).json({ message: `The token is not valid` });
    }
}

export default authMiddleware;