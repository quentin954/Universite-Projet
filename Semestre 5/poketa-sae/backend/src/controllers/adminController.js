const adminService = require('../services/adminService');

const getAllUsers = async (req, res) => {
    try {
        const users = await adminService.getAllUsers();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await adminService.deleteUser(userId);
        res.status(200).json({ success: true, message: 'User deleted successfully.' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllUsers,
    deleteUser
};