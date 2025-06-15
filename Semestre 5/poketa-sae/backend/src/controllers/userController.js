const userService = require('../services/userService');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const user = await userService.register(username, email, password);

        res.status(201).json({ success: true, message: 'User registered successfully. Please verify your email.' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const { user, token } = await userService.login(email, password);
        if (!user.status.isMailVerified) {
            return res.status(400).json({ success: false, message: 'Please verify your email before logging in' });
        }

        res.status(200).json({ success: true, data: { token } });
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = req.user;
        const profile = await userService.getProfile(user);
        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const user = req.user;
        const profileData = req.body.profile;
        const updatedUser = await userService.updateUserProfile(user._id, profileData);
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const updateUserSettings = async (req, res) => {
    try {
        const user = req.user;
        const settingsData = req.body.settings;
        const updatedSettings = await userService.updateUserSettings(user._id, settingsData);
        res.status(200).json({ success: true, data: updatedSettings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteUserAccount = async (req, res) => {
    try {
        const user = req.user;
        await userService.deleteUserAccount(user._id);
        res.status(200).json({ success: true, message: 'User account deleted successfully.' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAccountStatus = async (req, res) => {
    try {
        const user = req.user;
        const status = await userService.getAccountStatus(user);
        res.status(200).json({ success: true, data: status });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ success: false, message: 'Token is required' });
        }

        await userService.verifyEmail(token);

        res.status(200).json({ success: true, message: 'Email successfully verified.' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const user = req.user;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Both current and new passwords are required' });
        }

        await userService.changePassword(user, currentPassword, newPassword);
        res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        await userService.requestPasswordReset(email);

        res.status(200).json({ success: true, message: 'Password reset email sent successfully.' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ success: false, message: 'Token and new password are required' });
        }

        await userService.resetPassword(token, newPassword);

        res.status(200).json({ success: true, message: 'Password reset successfully.' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
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