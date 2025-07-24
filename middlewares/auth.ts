import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.sendStatus(401); 

    jwt.verify(token, process.env.JWT_ACCESS_SECRET as string, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; 
        next();
    });
}
