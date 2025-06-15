const nodemailer = require('nodemailer');
const crypto = require('crypto');
const config = require('../config/env');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.emailUser,
        pass: config.emailPass
    }
});

const generateVerificationToken = () => {
    const token = crypto.randomBytes(128).toString('hex');
    return token;
};

const sendVerificationEmail = async (email, token) => {
    const verificationUrl = `${config.frontendUrl}/verify-email?token=${token}`;
    
    const mailOptions = {
        from: config.emailUser,
        to: email,
        subject: 'Email Verification',
        html: `<p>Please verify your email by clicking on the link below:</p>
               <p><a href="${verificationUrl}">Verify Email</a></p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send verification email');
    }
};

const sendPasswordResetEmail = async (email, token) => {
    const resetUrl = `${config.frontendUrl}/reset-password?token=${token}`;

    const mailOptions = {
        from: config.emailUser,
        to: email,
        subject: 'Password Reset',
        html: `<p>You requested a password reset. Click the link below to reset your password:</p>
               <p><a href="${resetUrl}">Reset Password</a></p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};

module.exports = {
    generateVerificationToken,
    sendVerificationEmail,
    sendPasswordResetEmail
};