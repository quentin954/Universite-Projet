const { MongoClient } = require('mongodb');
const config = require('./env');

let client;
let db;

const connectDB = async () => {
    if (db) {
        console.log('MongoDB is already connected');
        return db;
    }

    try {
        client = new MongoClient(config.mongoUri);

        await client.connect();

        db = client.db(config.dbName);
        console.log(`MongoDB connected to database: ${config.dbName}`);
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        throw error;
    }
};

const getCollection = (collectionName) => {
    if (!db) {
        throw new Error('Database not connected. Call connectDB first.');
    }
    return db.collection(collectionName);
};

module.exports = {
    connectDB,
    getCollection
};