import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

const accessExpire = process.env.JWT_ACCESS_EXPIRE || '1y';
const refreshExpire = process.env.JWT_REFRESH_EXPIRE || '1y';

if (!accessSecret || !refreshSecret) {
    throw new Error('JWT secrets are not defined in environment variables');
}

export function generateAccessToken(payload: object) {
    return jwt.sign(payload, accessSecret, {
        expiresIn: accessExpire as jwt.SignOptions['expiresIn'],
    });
}

export function generateRefreshToken(payload: object) {
    return jwt.sign(payload, refreshSecret, {
        expiresIn: refreshExpire as jwt.SignOptions['expiresIn'],
    });
}
