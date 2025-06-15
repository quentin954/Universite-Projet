const config = require('../config/env');
const userModel = config.useMock
    ? require('../mocks/mockUserModel')
    : require('../models/userModel');

const getAllUsers = async () => {
    try {
        const users = await userModel.getAllUsers();
        return users;
    } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
    }
};

const deleteUser = async (userId) => {
    try {
        await userModel.deleteUser(userId);
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};

module.exports = {
    getAllUsers,
    deleteUser
};