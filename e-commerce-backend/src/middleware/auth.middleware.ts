
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authmiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        // Verify token logic here (e.g., using JWT)
        // const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        // req.use = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
export default authmiddleware;