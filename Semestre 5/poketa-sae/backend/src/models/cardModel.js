const { getCollection } = require('../config/db');

const getAllBlocksAndExtensions = async () => {
    try {
        const blocsCollection = getCollection('blocs');
        const blocks = await blocsCollection.find().toArray();
        return blocks;
    } catch (error) {
        throw new Error('Error fetching blocks and extensions: ' + error.message);
    }
};

const findBlockByExtensionCode = async (code) => {
    try {
        const blocsCollection = getCollection('blocs');
        return await blocsCollection.findOne({ 'extensions.Code': code });
    } catch (error) {
        throw new Error('Error fetching block by extension code: ' + error.message);
    }
};

const searchCards = async (term) => {
    try {
        const liveSearchCollection = getCollection('live_search');

        const results = await liveSearchCollection.find({
            term: { $regex: `^${term}`, $options: 'i' }
        }).limit(10).toArray();

        if (results.length === 0) {
            throw new Error('Aucun résultat trouvé pour ce terme.');
        }

        return results;
    } catch (error) {
        throw new Error('Erreur lors de la recherche des cartes : ' + error.message);
    }
};

const searchComplete = async (term) => {
    try {
        const blocsCollection = getCollection('blocs');

        const extensionResults = await blocsCollection.aggregate([
            { $match: { 'extensions.Code': term } },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    startDate: 1,
                    endDate: 1,
                    nbExtension: 1,
                    theme: 1,
                    newFeatures: 1,
                    extensions: {
                        $filter: {
                            input: '$extensions',
                            as: 'extension',
                            cond: { $eq: ['$$extension.Code', term] }
                        }
                    }
                }
            }
        ]).toArray();

        if (extensionResults.length > 0) {
            return extensionResults;
        }

        const cardResults = await blocsCollection.aggregate([
            { $unwind: "$extensions" },
            {
                $addFields: {
                    "extensions.cards": {
                        $filter: {
                            input: "$extensions.cards",
                            as: "card",
                            cond: { $regexMatch: { input: "$$card.name", regex: term, options: "i" } }
                        }
                    }
                }
            },
            { $match: { "extensions.cards": { $ne: [] } } },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    startDate: { $first: "$startDate" },
                    endDate: { $first: "$endDate" },
                    nbExtension: { $first: "$nbExtension" },
                    theme: { $first: "$theme" },
                    newFeatures: { $first: "$newFeatures" },
                    extensions: { $push: "$extensions" }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    startDate: 1,
                    endDate: 1,
                    nbExtension: 1,
                    theme: 1,
                    newFeatures: 1,
                    extensions: 1
                }
            }
        ]).toArray();

        if (cardResults.length === 0) {
            throw new Error('Aucun résultat trouvé pour ce terme.');
        }

        return cardResults;
    } catch (error) {
        throw new Error('Erreur lors de la recherche des cartes : ' + error.message);
    }
};

module.exports = {
    getAllBlocksAndExtensions,
    findBlockByExtensionCode,
    searchCards,
    searchComplete
};