
import { configEnv } from '@/config/env';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {

    // extracting token from headers example: "Bearer <token>"
  const token = req.headers.authorization?.split(' ')[1] ?? null;

    if (!token) return res.status(401).json({ message: 'No token provided' });
    
    try {
        // checking token verification
        const decoded = jwt.verify(token, configEnv.jwtSecret || 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Optional auth middleware - doesn't fail if no token
export const optionalAuthmiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] ?? null;

    if (token) {
        try {
            const decoded = jwt.verify(token, configEnv.jwtSecret || 'your_jwt_secret');
            req.user = decoded;
        } catch (error) {
            // Token invalid but don't block - allow public access
            console.log('Invalid token, allowing public access');
        }
    }
    next();
};
