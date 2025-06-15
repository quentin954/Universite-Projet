const mockUsers = [];

const registerUser = async ({
    username, email, password, profile, settings, role, status, security, lastLogin, ipHistory, tokens
}) => {
    if (!username || !email || !password) {
        throw new Error('All fields are required.');
    }

    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
        throw new Error('User already exists.');
    }

    const newUser = {
        _id: mockUsers.length + 1,
        username,
        email,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: profile || {},
        settings: settings || { notifications: { email: true, sms: true, push: true } },
        role: role || "User",
        status: status || { isActive: true, isMailVerified: false, isPhoneVerified: false, banned: { isBanned: false, reason: null, banDate: null } },
        security: security || { twoFactorAuth: { enabled: false, method: null } },
        lastLogin: lastLogin || null,
        ipHistory: ipHistory || [],
        tokens: tokens || {
            accessToken: { value: '', expiresAt: null },
            emailVerification: { token: '', expiresAt: null, used: false },
            passwordReset: { token: '', expiresAt: null, used: false }
        }
    };

    mockUsers.push(newUser);

    return newUser;
};

const findUserByEmail = async (email) => {
    return mockUsers.find(user => user.email === email);
};

const findUserById = async (id) => {
    return mockUsers.find(user => user._id === id);
};

const findUserByUsername = async (username) => {
    return mockUsers.find(user => user.username === username);
};

const updateUserProfile = async (id, profileUpdates) => {
    const user = mockUsers.find(u => u._id === id);
    if (!user) {
        throw new Error('User not found');
    }

    user.profile = { ...user.profile, ...profileUpdates };
    user.updatedAt = new Date();
    return { id: user._id, profile: user.profile };
};

const updateUserSettings = async (id, settingsUpdates) => {
    const user = mockUsers.find(u => u._id === id);
    if (!user) {
        throw new Error('User not found');
    }

    user.settings = { ...user.settings, ...settingsUpdates };
    user.updatedAt = new Date();
    return { id: user._id, settings: user.settings };
};

const deleteUserAccount = async (id) => {
    const index = mockUsers.findIndex(u => u._id === id);
    if (index === -1) {
        throw new Error('User not found');
    }

    const deletedUser = mockUsers.splice(index, 1);
    return deletedUser[0];
};

const findUserByToken = async (token) => {
    return mockUsers.find(user => user.tokens.emailVerification.token === token && !user.tokens.emailVerification.used);
};

const updateUserStatus = async (userId, statusUpdate) => {
    const user = mockUsers.find(u => u._id === userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.status.isMailVerified = statusUpdate.isMailVerified;
    user.updatedAt = new Date();
    return { id: user._id, status: { isMailVerified: statusUpdate.isMailVerified } };
};

const updateUserPassword = async (userId, newPassword) => {
    const user = mockUsers.find(u => u._id === userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.password = newPassword;
    user.updatedAt = new Date();
    return { id: user._id, password: newPassword };
};

const getAllUsers = async () => {
    return mockUsers;
};

const deleteUser = async (userId) => {
    const userIndex = mockUsers.findIndex(user => user._id === userId);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    mockUsers.splice(userIndex, 1);
};

const updateUserTokenStatus = async (userId, { emailVerificationUsed }) => {
    try {
        const user = mockUsers.find(u => u._id === userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.tokens.emailVerification.used = emailVerificationUsed;
        user.updatedAt = new Date();

        return { id: user._id, tokens: { emailVerificationUsed } };
    } catch (error) {
        throw new Error('Error updating token status in mock: ' + error.message);
    }
};

const updateUserPasswordResetToken = async (userId, token) => {
    const user = mockUsers.find(u => u._id === userId);
    if (!user) {
        throw new Error('User not found');
    }

    user.tokens.passwordReset.token = token;
    user.tokens.passwordReset.expiresAt = new Date(Date.now() + 3600000); // 1 hour
    user.tokens.passwordReset.used = false;
    user.updatedAt = new Date();
};

const findUserByPasswordResetToken = async (token) => {
    return mockUsers.find(user => 
        user.tokens.passwordReset.token === token &&
        !user.tokens.passwordReset.used &&
        user.tokens.passwordReset.expiresAt > new Date()
    );
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