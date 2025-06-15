const cardService = require('../services/cardService');

const getAllBlocksAndExtensions = async (req, res) => {
    try {
        const blocks = await cardService.getAllBlocksAndExtensions();
        res.status(200).json({ success: true, data: blocks });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getExtensionsById = async (req, res) => {
    try {
        const { extensionId } = req.params;
        const extension = await cardService.getExtensionByCode(extensionId);
        if (!extension) {
            return res.status(404).json({ success: false, message: 'Extension not found' });
        }
        res.status(200).json({ success: true, data: extension });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const searchLive = async (req, res) => {
    try {
        const { term } = req.body;
        const results = await cardService.searchCards(term);
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const searchComplete =  async (req, res) => {
    try {
        const { term } = req.body;
        const results = await cardService.searchComplete(term);
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


module.exports = {
    getAllBlocksAndExtensions,
    getExtensionsById,
    searchLive,
    searchComplete
};