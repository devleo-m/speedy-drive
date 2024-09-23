import { Request, Response, NextFunction } from 'express';
import { TokenPayload } from '../interface/token.payload.interface';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as TokenPayload;

    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : null;

    if (token === '[free:token]') {
        return next(); // Bypass the authentication for testing with token "free"
    }

    if (!user || user.role !== 'ADMIN') { // The user is not an admin
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    
    next();
}

export default isAdmin;