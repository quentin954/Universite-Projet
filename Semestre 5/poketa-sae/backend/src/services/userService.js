const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const config = require('../config/env');
const { generateVerificationToken, sendVerificationEmail, sendPasswordResetEmail } = require('../utils/email');

const userModel = config.useMock
    ? require('../mocks/mockUserModel')
    : require('../models/userModel');

const register = async (username, email, password) => {
    try {
        const existingUserByEmail = await userModel.findUserByEmail(email);
        if (existingUserByEmail) {
            throw new Error('Email is already in use.');
        }

        const existingUserByUsername = await userModel.findUserByUsername(username);
        if (existingUserByUsername) {
            throw new Error('Username is already taken.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const emailVerificationToken = generateVerificationToken();

        const newUser = {
            username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            profile: { firstName: '', lastName: '', avatarUrl: '', bio: '', dateOfBirth: ''},
            settings: { language: 'en', theme: 'light', notifications: { email: true, sms: true, push: true } },
            role: "User",
            status: { isActive: true, isMailVerified: false, isPhoneVerified: false, banned: { isBanned: false, reason: null, banDate: null } },
            security: { twoFactorAuth: { enabled: false, method: null } },
            lastLogin: null,
            ipHistory: [],
            tokens: { accessToken: { value: '', expiresAt: null }, emailVerification: { token: emailVerificationToken, expiresAt: null, used: false }, passwordReset: { token: '', expiresAt: null, used: false } }
        };

        const user = await userModel.registerUser(newUser);

        await sendVerificationEmail(user.email, emailVerificationToken);

        return { id: user._id, username: user.username, email: user.email, tokens: user.tokens };
    } catch (error) {
        throw new Error('Registration failed: ' + error.message);
    }
};

const login = async (email, password) => {
    try {
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.generateToken(user._id);
        return { user, token };
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
};

const getProfile = async (user) => {
    try {
        return { ...user.profile, role: user.role || 'User' };
    } catch (error) {
        throw new Error('Error getting profile: ' + error.message);
    }
};

const updateUserProfile = async (userId, profileData) => {
    try {
        const updatedUser = await userModel.updateUserProfile(userId, profileData);
        return updatedUser;
    } catch (error) {
        throw new Error('Error updating profile: ' + error.message);
    }
};

const updateUserSettings = async (userId, settingsData) => {
    try {
        const updatedSettings = await userModel.updateUserSettings(userId, settingsData);
        return updatedSettings;
    } catch (error) {
        throw new Error('Error updating settings: ' + error.message);
    }
};

const deleteUserAccount = async (userId) => {
    try {
        await userModel.deleteUserAccount(userId);
    } catch (error) {
        throw new Error('Error deleting user account: ' + error.message);
    }
};

const getAccountStatus = async (user) => {
    try {
        return user.status;
    } catch (error) {
        throw new Error('Error fetching account status: ' + error.message);
    }
};

const verifyEmail = async (token) => {
    try {
        const user = await userModel.findUserByToken(token);
        if (!user) {
            throw new Error('Invalid or expired verification token');
        }

        if (user.status.isMailVerified) {
            throw new Error('Email is already verified.');
        }

        await userModel.updateUserTokenStatus(user._id, { emailVerificationUsed: true });
        
        const updatedUser = await userModel.updateUserStatus(user._id, { isMailVerified: true });
        return updatedUser;
    } catch (error) {
        throw new Error('Email verification failed: ' + error.message);
    }
};

const changePassword = async (user, currentPassword, newPassword) => {
    try {
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            throw new Error('Current password is incorrect');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await userModel.updateUserPassword(user._id, hashedPassword);
        return updatedUser;
    } catch (error) {
        throw new Error('Error changing password: ' + error.message);
    }
};

const requestPasswordReset = async (email) => {
    try {
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const passwordResetToken = generateVerificationToken();

        await userModel.updateUserPasswordResetToken(user._id, passwordResetToken);

        await sendPasswordResetEmail(user.email, passwordResetToken);
    } catch (error) {
        throw new Error('Error requesting password reset: ' + error.message);
    }
};

const resetPassword = async (token, newPassword) => {
    try {
        const user = await userModel.findUserByPasswordResetToken(token);
        if (!user) {
            throw new Error('Invalid or expired password reset token');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await userModel.updateUserPassword(user._id, hashedPassword);
        await userModel.updateUserPasswordResetToken(user._id, null);
    } catch (error) {
        throw new Error('Error resetting password: ' + error.message);
    }
};

module.exports = {
    register,
    login,
    getProfile,
    updateUserProfile,
    updateUserSettings,
    deleteUserAccount,
    getAccountStatus,
    verifyEmail,
    changePassword,
    requestPasswordReset,
    resetPassword
};