require('dotenv').config();

const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    dbName: process.env.DB_NAME,
    useMock: process.env.USE_MOCK === 'true',
    jwtSecret: process.env.JWT_SECRET,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    frontendUrl: process.env.FRONTEND_URL,
};

module.exports = config;