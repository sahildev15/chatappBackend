"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInWithEmail = signInWithEmail;
exports.verifyOtpAndCheckProfile = verifyOtpAndCheckProfile;
exports.updateProfile = updateProfile;
const userModel_1 = require("../models/userModel");
const jwt_1 = require("../utils/jwt");
const sendOtpEmail_1 = require("../utils/sendOtpEmail"); // Make sure path is correct
const otpStore = {};
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
async function signInWithEmail(req, res) {
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ message: 'Email is required' });
    try {
        const otp = generateOtp();
        otpStore[email] = {
            code: otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        };
        await (0, sendOtpEmail_1.sendOtpEmail)(email, otp);
        console.log(`[OTP SENT] ${otp} to ${email}`);
        return res.json({
            message: 'OTP sent successfully to your email',
            status: 'success',
        });
    }
    catch (err) {
        return res.status(500).json({ message: 'Failed to send OTP', error: err.message });
    }
}
// ✅ Step 2: Verify OTP and Check Profile
async function verifyOtpAndCheckProfile(req, res) {
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
        const user = await (0, userModel_1.findOne)({ email });
        const tokens = {
            accessToken: (0, jwt_1.generateAccessToken)({ email }),
            refreshToken: (0, jwt_1.generateRefreshToken)({ email }),
        };
        if (!user) {
            return res.json(Object.assign({ message: 'Profile is not created', status: false }, tokens));
        }
        if (user.name && user.username) {
            return res.json(Object.assign({ message: 'Profile is created', status: true, userId: user._id }, tokens));
        }
        else {
            return res.json(Object.assign({ message: 'Profile is not created', status: 'incomplete', userId: user._id }, tokens));
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
}
// ✅ Step 3: Update Profile
async function updateProfile(req, res) {
    const { email, name, username, phoneNumber, photos } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required to update profile' });
    }
    try {
        const user = await (0, userModel_1.findOne)({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (name)
            user.name = name;
        if (username)
            user.username = username;
        if (phoneNumber)
            user.phoneNumber = phoneNumber;
        if (photos)
            user.photos = photos;
        await user.save();
        return res.json({ message: 'Profile updated successfully', user });
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
}
