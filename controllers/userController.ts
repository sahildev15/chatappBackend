import { Request, Response } from 'express';
import User, { findOne } from '../models/userModel';
import type { IUser } from '../models/userModel';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
// Sign in with email
export async function signInWithEmail(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    try {
        // Simulate OTP sending
        return res.json({
            message: 'OTP sent successfully',
            status: 'success',
        });
    } catch (err: any) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
}
export async function verifyOtpAndCheckProfile(req: Request, res: Response) {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
        if (otp !== '123456') {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        const user: IUser | null = await findOne({ email });

        const tokens = {
            accessToken: generateAccessToken({ email }),
            refreshToken: generateRefreshToken({ email })
        };

        if (!user) {
            return res.json({
                message: 'Profile is not created',
                status: false,
                ...tokens
            });
        }

        if (user.name && user.username) {
            return res.json({
                message: 'Profile is created',
                status: true,
                userId: user._id,
                ...tokens
            });
        } else {
            return res.json({
                message: 'Profile is not created',
                status: 'incomplete',
                userId: user._id,
                ...tokens
            });
        }

    } catch (err: any) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
}
export async function updateProfile(req: Request, res: Response) {
    const { email, name, username, phoneNumber, photos } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required to update profile' });
    }

    try {
        const user: IUser | null = await findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (name) user.name = name;
        if (username) user.username = username;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (photos) user.photos = photos;
        await user.save();
        return res.json({ message: 'Profile updated successfully', user });
    } catch (err: any) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
}