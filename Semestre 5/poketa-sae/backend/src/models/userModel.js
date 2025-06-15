const { getCollection } = require('../config/db');
const { ObjectId } = require('mongodb');

const registerUser = async (user) => {
    try {
        const usersCollection = getCollection('users');
        const result = await usersCollection.insertOne(user);
        return { id: result.insertedId, ...user };
    } catch (error) {
        throw new Error('Error registering user: ' + error.message);
    }
};

const findUserByEmail = async (email) => {
    try {
        const usersCollection = getCollection('users');
        return await usersCollection.findOne({ email });
    } catch (error) {
        throw new Error('Error finding user by email: ' + error.message);
    }
};

const findUserById = async (userId) => {
    try {
        const usersCollection = getCollection('users');
        const objectId = ObjectId.createFromHexString(userId);
        return await usersCollection.findOne({ _id: objectId });
    } catch (error) {
        throw new Error('Error finding user by ID: ' + error.message);
    }
};

const findUserByUsername = async (username) => {
    try {
        const usersCollection = getCollection('users');
        return await usersCollection.findOne({ username });
    } catch (error) {
        throw new Error('Error finding user by username: ' + error.message);
    }
};

const updateUserProfile = async (userId, profileData) => {
    try {
        const usersCollection = getCollection('users');
        await usersCollection.updateOne({ _id: userId }, { $set: { profile: profileData, updatedAt: new Date() } });
        return { id: userId, profile: profileData };
    } catch (error) {
        throw new Error('Error updating profile: ' + error.message);
    }
};

const updateUserSettings = async (userId, settingsData) => {
    try {
        const usersCollection = getCollection('users');
        await usersCollection.updateOne({ _id: userId }, { $set: { settings: settingsData, updatedAt: new Date() } });
        return { id: userId, settings: settingsData };
    } catch (error) {
        throw new Error('Error updating settings: ' + error.message);
    }
};

const deleteUserAccount = async (userId) => {
    try {
        const usersCollection = getCollection('users');
        await usersCollection.deleteOne({ _id: userId });
    } catch (error) {
        throw new Error('Error deleting user account: ' + error.message);
    }
};

const findUserByToken = async (token) => {
    try {
        const usersCollection = getCollection('users');
        return await usersCollection.findOne({
            'tokens.emailVerification.token': token,
            'tokens.emailVerification.used': false
        });
    } catch (error) {
        throw new Error('Error finding user by token: ' + error.message);
    }
};

const updateUserStatus = async (userId, statusUpdate) => {
    try {
        const usersCollection = getCollection('users');
        await usersCollection.updateOne(
            { _id: userId },
            { $set: { 'status.isMailVerified': statusUpdate.isMailVerified, updatedAt: new Date() } }
        );
        return { id: userId, status: { isMailVerified: statusUpdate.isMailVerified } };
    } catch (error) {
        throw new Error('Error updating user status: ' + error.message);
    }
};

const updateUserPassword = async (userId, newPassword) => {
    try {
        const usersCollection = getCollection('users');
        await usersCollection.updateOne({ _id: userId }, { $set: { password: newPassword, updatedAt: new Date() } });
        return { id: userId, password: newPassword };
    } catch (error) {
        throw new Error('Error updating password: ' + error.message);
    }
};

const getAllUsers = async () => {
    try {
        const usersCollection = getCollection('users');
        return await usersCollection.find({}).toArray();
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

const deleteUser = async (userId) => {
    try {
        const usersCollection = getCollection('users');
        const objectId = ObjectId.createFromHexString(userId);
        const result = await usersCollection.deleteOne({ _id: objectId });
        if (result.deletedCount === 0) {
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

const updateUserTokenStatus = async (userId, { emailVerificationUsed }) => {
    try {
        const usersCollection = getCollection('users');
        await usersCollection.updateOne(
            { _id: userId },
            {
                $set: {
                    'tokens.emailVerification.used': emailVerificationUsed,
                    updatedAt: new Date()
                }
            }
        );
        return { id: userId, tokens: { emailVerificationUsed } };
    } catch (error) {
        throw new Error('Error updating token status: ' + error.message);
    }
};

const updateUserPasswordResetToken = async (userId, token) => {
    try {
        const usersCollection = getCollection('users');
        await usersCollection.updateOne(
            { _id: userId },
            {
                $set: {
                    'tokens.passwordReset.token': token,
                    'tokens.passwordReset.expiresAt': new Date(Date.now() + 3600000),
                    'tokens.passwordReset.used': false,
                    updatedAt: new Date()
                }
            }
        );
    } catch (error) {
        throw new Error('Error updating password reset token: ' + error.message);
    }
};

const findUserByPasswordResetToken = async (token) => {
    try {
        const usersCollection = getCollection('users');
        return await usersCollection.findOne({
            'tokens.passwordReset.token': token,
            'tokens.passwordReset.used': false,
            'tokens.passwordReset.expiresAt': { $gt: new Date() }
        });
    } catch (error) {
        throw new Error('Error finding user by password reset token: ' + error.message);
    }
};

module.exports = {
    registerUser,
    findUserByEmail,
    findUserById,
    findUserByUsername,
    updateUserProfile,
    updateUserSettings,
    deleteUserAccount,
    findUserByToken,
    updateUserStatus,
    updateUserPassword,
    getAllUsers,
    deleteUser,
    updateUserTokenStatus,
    updateUserPasswordResetToken,
    findUserByPasswordResetToken
};