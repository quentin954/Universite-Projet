const mockCollections = [];

const findCollectionByUserId = async (userId) => {
    const collection = mockCollections.find(c => c.users === userId);
    return collection;
};

const updateCollection = async (userId, updatedCards) => {
    const collection = mockCollections.find(c => c.users === userId);
    if (!collection) {
        throw new Error('Collection not found for this user');
    }
    collection.cards = updatedCards;
};

const createCollectionForUser = async (userId) => {
    const existingCollection = mockCollections.find(c => c.users === userId);
    if (existingCollection) {
        throw new Error('Collection already exists for this user');
    }

    const newCollection = {
        users: userId,
        cards: []
    };

    mockCollections.push(newCollection);

    return newCollection;
};

module.exports = {
    findCollectionByUserId,
    updateCollection,
    createCollectionForUser
};