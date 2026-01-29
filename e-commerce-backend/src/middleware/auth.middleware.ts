
import { configEnv } from '@/config/env';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

const authmiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] ?? null;

  
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        // checking token validity 
        const decoded = jwt.verify(token, configEnv.jwtSecret || 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
export default authmiddleware;