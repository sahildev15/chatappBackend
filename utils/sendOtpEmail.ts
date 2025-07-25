// utils/sendOtp.ts
import nodemailer from 'nodemailer';

export async function sendOtpEmail(email: string, otp: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sahildev043@gmail.com',
            pass: 'riea fvzy lraw ytgx',
        },
    });

    const mailOptions = {
        from: '"ChatVerse" <yourgmail@gmail.com>',
        to: email,
        subject: '🔐 Your ChatVerse OTP Code',
        html: `
        <div style="max-width: 480px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; padding: 24px; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="text-align: center; color: #4A90E2;">👋 Welcome to ChatVerse</h2>
            <p style="font-size: 16px; color: #333;">Hello there!</p>
            <p style="font-size: 16px; color: #333;">
                Use the following OTP to verify your email address and sign in to your ChatVerse account:
            </p>
            <div style="text-align: center; margin: 24px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; background-color: #fff; padding: 12px 24px; border: 2px dashed #4A90E2; border-radius: 6px; color: #4A90E2;">
                    ${otp}
                </span>
            </div>
            <p style="font-size: 14px; color: #999;">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
            <hr style="margin: 24px 0;" />
            <p style="font-size: 12px; text-align: center; color: #ccc;">
                If you did not request this OTP, you can safely ignore this email.
            </p>
        </div>
    `
    };


    await transporter.sendMail(mailOptions);
}
