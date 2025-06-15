const { connectDB } = require('./config/db');
const { initializeBlocs } = require('./scripts/initializeBlocs');
const { initializeLiveSearch } = require('./scripts/initializeLiveSearch');
const config = require('./config/env');
const app = require('./app');

const startServer = async () => {
    try {
        if (!config.useMock) {
            await connectDB();
            await initializeBlocs();
            await initializeLiveSearch();
        } else {
            console.log('Mode mock activé, pas de connexion à la base de données.');
        }

        app.listen(config.port, () => {
            console.log(`Server is running on http://localhost:${config.port}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error.message);
        process.exit(1);
    }
};

startServer();