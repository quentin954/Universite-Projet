const jwtUtils = require('../utils/jwt');
const config = require('../config/env');
const userModel = config.useMock ? require('../mocks/mockUserModel') : require('../models/userModel');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication token is missing.' });
        }

        const decoded = jwtUtils.verifyToken(token);
        const user = await userModel.findUserById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ success: false, message: 'You do not have permission to perform this action.' });
    }
    next();
};

module.exports = { authenticate, isAdmin };