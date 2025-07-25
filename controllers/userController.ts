import { Request, Response } from 'express';
import User, { findOne } from '../models/userModel';
import type { IUser } from '../models/userModel';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { sendOtpEmail } from '../utils/sendOtpEmail'; // Make sure path is correct

// 🧠 OTP store with expiry
interface OtpEntry {
    code: string;
    expiresAt: number;
}

const otpStore: { [email: string]: OtpEntry } = {};

function generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function signInWithEmail(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    try {
        const otp = generateOtp();

        otpStore[email] = {
            code: otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        };

        await sendOtpEmail(email, otp);
        console.log(`[OTP SENT] ${otp} to ${email}`);

        return res.json({
            message: 'OTP sent successfully to your email',
            status: 'success',
        });
    } catch (err: any) {
        return res.status(500).json({ message: 'Failed to send OTP', error: err.message });
    }
}

// ✅ Step 2: Verify OTP and Check Profile
export async function verifyOtpAndCheckProfile(req: Request, res: Response) {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const entry = otpStore[email];

    if (!entry || entry.code !== otp) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    if (Date.now() > entry.expiresAt) {
        delete otpStore[email];
        return res.status(400).json({ message: 'OTP has expired' });
    }

    delete otpStore[email]; // prevent re-use

    try {
        const user: IUser | null = await findOne({ email });

        const tokens = {
            accessToken: generateAccessToken({ email }),
            refreshToken: generateRefreshToken({ email }),
        };

        if (!user) {
            return res.json({
                message: 'Profile is not created',
                status: false,
                ...tokens,
            });
        }

        if (user.name && user.username) {
            return res.json({
                message: 'Profile is created',
                status: true,
                userId: user._id,
                ...tokens,
            });
        } else {
            return res.json({
                message: 'Profile is not created',
                status: 'incomplete',
                userId: user._id,
                ...tokens,
            });
        }
    } catch (err: any) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// ✅ Step 3: Update Profile
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
