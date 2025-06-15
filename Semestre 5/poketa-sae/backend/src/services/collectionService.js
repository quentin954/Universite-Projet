const config = require('../config/env');
const collectionModel = config.useMock
    ? require('../mocks/mockCollectionModel')
    : require('../models/collectionModel');

const getUserCollection = async (userId) => {
    try {
        return await collectionModel.findCollectionByUserId(userId);
    } catch (error) {
        throw new Error('Error fetching collection: ' + error.message);
    }
};

const addCardToCollection = async (userId, card) => {
    try {
        let collection = await collectionModel.findCollectionByUserId(userId);
        if (!collection) {
            collection = await collectionModel.createCollectionForUser(userId);
        }
        
        const existingCardIndex = collection.cards.findIndex(c => 
            c.card.name === card.name && c.card.extension === card.extension && c.card.bloc === card.bloc
        );

        if (existingCardIndex > -1) {
            throw new Error('This card is already in your collection');
        } else {
            collection.cards.push({
                card: {
                    name: card.name,
                    type: card.type,
                    rarity: card.rarity,
                    features: card.features,
                    numPok: card.numPok,
                    image: card.image,
                    extension: card.extension,
                    bloc: card.bloc
                },
                quantity: 1
            });
        }

        await collectionModel.updateCollection(userId, collection.cards);
        return collection;
    } catch (error) {
        throw new Error('Error adding card to collection: ' + error.message);
    }
};

const updateCardQuantity = async (userId, posId, quantity) => {
    try {
        const collection = await collectionModel.findCollectionByUserId(userId);

        if (posId < 0 || posId >= collection.cards.length) {
            throw new Error('Invalid card position in collection');
        }

        collection.cards[posId].quantity = quantity;
        await collectionModel.updateCollection(userId, collection.cards);

        return collection;
    } catch (error) {
        throw new Error('Error updating card quantity: ' + error.message);
    }
};

const deleteCardFromCollection = async (userId, posId) => {
    try {
        const collection = await collectionModel.findCollectionByUserId(userId);

        if (posId < 0 || posId >= collection.cards.length) {
            throw new Error('Invalid card position in collection');
        }

        collection.cards.splice(posId, 1);
        await collectionModel.updateCollection(userId, collection.cards);
        return { message: 'Card deleted from collection.' };
    } catch (error) {
        throw new Error('Error deleting card from collection: ' + error.message);
    }
};

module.exports = {
    getUserCollection,
    addCardToCollection,
    updateCardQuantity,
    deleteCardFromCollection
};