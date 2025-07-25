"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const accessExpire = process.env.JWT_ACCESS_EXPIRE || '1y';
const refreshExpire = process.env.JWT_REFRESH_EXPIRE || '1y';
if (!accessSecret || !refreshSecret) {
    throw new Error('JWT secrets are not defined in environment variables');
}
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, accessSecret, {
        expiresIn: accessExpire,
    });
}
function generateRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, refreshSecret, {
        expiresIn: refreshExpire,
    });
}
