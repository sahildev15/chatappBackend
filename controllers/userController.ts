import { Request, Response } from 'express';
import User, { findOne } from '../models/userModel';
import type { IUser } from '../models/userModel';

// Sign in with email
export async function signInWithEmail(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    try {
        const user = await findOne({ email });
        if (user) {
            return res.json({
                "message":  'User exists',
                exists: true, userId: user._id
            });
        } else {
            return res.json(
                {
                    "message": 'User does not exist',
                    exists: false
                });
        }
    } catch (err: any) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
}

export async function createProfile(req: Request, res: Response) {
    const { email, name, phoneNumber, photos, username } = req.body;

    if (!email || !name || !username) {
        return res.status(400).json({ message: 'Email, name and username are required' });
    }

    try {
        let user: IUser | null = await findOne({ email });

        if (!user) {
            const newUser = new User({ email, name, phoneNumber, photos, username });
            await newUser.save();
            return res.json({ message: 'Profile created', userId: newUser._id });
        }

        if (!user.name || !user.username) {
            user.name = name;
            user.phoneNumber = phoneNumber;
            user.photos = photos;
            user.username = username;
            await user.save();
            return res.json({ message: 'Profile updated', userId: user._id });
        }

        return res.status(400).json({ message: 'User already has a complete profile' });

    } catch (err: any) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
}
