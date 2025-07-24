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
                "message": 'User exists',
                "email": user.email,
                "name": user.name,
                "phoneNumber": user.phoneNumber,
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
    const { email, name, phoneNumber, photos, } = req.body;

    if (!email || !name) {
        return res.status(400).json({ message: 'Email, name and username are required' });
    }

    try {
        let user: IUser | null = await findOne({ email });

        if (!user) {
            const newUser = new User({ email, name, phoneNumber, photos, });
            await newUser.save();
            return res.json({ message: 'Profile created', userId: newUser._id });
        }

        return res.status(400).json({ message: 'User already has a complete profile' });

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