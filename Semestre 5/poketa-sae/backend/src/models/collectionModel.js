const { getCollection } = require('../config/db');

const findCollectionByUserId = async (userId) => {
    try {
        const collections = getCollection('collections');
        return await collections.findOne({ users: userId });
    } catch (error) {
        throw new Error('Error finding collection: ' + error.message);
    }
};

const createCollectionForUser = async (userId) => {
    try {
        const collections = getCollection('collections');

        const result = await collections.insertOne({
            users: [userId],
            cards: []
        });

        return result.insertedId ? { users: [userId], cards: [] } : null;
    } catch (error) {
        throw new Error('Error creating collection: ' + error.message);
    }
};

const updateCollection = async (userId, updatedCards) => {
    try {
        const collections = getCollection('collections');
        await collections.updateOne({ users: userId }, { $set: { cards: updatedCards } });
    } catch (error) {
        throw new Error('Error updating collection: ' + error.message);
    }
};

module.exports = {
    findCollectionByUserId,
    updateCollection,
    createCollectionForUser
};