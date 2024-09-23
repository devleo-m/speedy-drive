import { Request, Response, NextFunction } from 'express';
import { TokenPayload } from '../interface/token.payload.interface';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as TokenPayload;

    if (!user || user.role !== 'CLIENT') { // The user is not an admin
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    
    next();
}

export default isAdmin;