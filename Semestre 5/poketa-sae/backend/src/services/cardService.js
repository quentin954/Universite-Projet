const config = require('../config/env');
const cardModel = config.useMock
    ? require('../mocks/mockCardModel')
    : require('../models/cardModel');

const getAllBlocksAndExtensions = async () => {
    try {
        const blocks = await cardModel.getAllBlocksAndExtensions();

        return blocks.map(block => ({
            ...block,
            extensions: block.extensions.map(({ cards, ...ext }) => ext)
        }));
    } catch (error) {
        throw new Error('Error fetching blocks and extensions: ' + error.message);
    }
};

const getExtensionByCode = async (code) => {
    try {
        const block = await cardModel.findBlockByExtensionCode(code);
        if (!block) {
            return null;
        }

        const extension = block.extensions.find(ext => ext.Code === code);
        return extension || null;
    } catch (error) {
        throw new Error('Error fetching extension by code: ' + error.message);
    }
};

const searchCards = async (term) => {
    try {
        const results = await cardModel.searchCards(term);
        return results;
    } catch (error) {
        throw new Error('Erreur dans le service de recherche : ' + error.message);
    }
};

const searchComplete = async (term) => {
    try {
        const results = await cardModel.searchComplete(term);
        return results;
    } catch (error) {
        throw new Error('Erreur dans le service de recherche : ' + error.message);
    }
};

module.exports = {
    getAllBlocksAndExtensions,
    getExtensionByCode,
    searchCards,
    searchComplete
};